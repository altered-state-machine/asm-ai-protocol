document.addEventListener("DOMContentLoaded", () => {
  // Web3 connector
  const Web3Modal = window.Web3Modal.default;
  const WalletConnectProvider = window.WalletConnectProvider.default;
  const providerOptions = {
    walletConnect: {
      package: WalletConnectProvider,
      options: {
        //FIXME infuraId: '123',
      },
    },
  };
  const web3Modal = new Web3Modal({
    cacheProvider: false,
    disableInjectedProvider: false, // Enables MM
    providerOptions,
  });
  let provider;

  // Connect wallet
  document.getElementById("connect-btn").addEventListener("click", async () => {
    await window.Web3Modal.removeLocal("walletconnect"); // Remove cache
    try {
      // Connect
      provider = await web3Modal.connect();
      provider = new ethers.providers.Web3Provider(provider);
      const connectedAddr = await provider.getSigner().getAddress();
      document.getElementById("addr").textContent = connectedAddr;

      // Load brains
      const brainsData = await (await fetch("/abi/MockedERC721.json")).json(); //FIXME replace with real abi
      const brains = new ethers.Contract(
        brainsData.address,
        brainsData.abi,
        provider.getSigner()
      );
      const brainBal = (await brains.balanceOf(connectedAddr)).toNumber();
      const sel = document.getElementById("brain-select");
      const memSel = document.getElementById("memory-select");
      const brainsDiv = document.getElementById("brains");

      const createBrainPanel = async (brainId) => {
        const brainP = document.createElement("p");
        let el = document.createElement("h3");
        el.textContent = `Brain #${brainId}`;
        brainP.appendChild(el);
        const brain = document.createElement("code");
        const brainData = await (
          await fetch(`/asset/${brainsData.address}/${brainId}`)
        ).json();
        brain.textContent = JSON.stringify(brainData);
        brainP.appendChild(brain);

        // Memories
        const memories = await (
          await fetch(`/nodes/${brainsData.address}/${brainId}`)
        ).json();
        el = document.createElement("h4");
        el.textContent = "Memories";
        brainP.appendChild(el);

        const appendChildMemories = (node, indentation) => {
          // Show memory
          el = document.createElement("code");
          const nodeSanChildren = Object.assign({}, node);
          delete nodeSanChildren.children;
          el.textContent =
            "> ".repeat(indentation) + JSON.stringify(nodeSanChildren);
          brainP.appendChild(el);
          if (node.nodeId === null) {
            // Add pin node button
            el = document.createElement("button");
            el.textContent = "Pin to Memory Tree";
            el.addEventListener("click", async () => {
              // Submit MT pin request
              const { params } = await (
                await fetch("/nodes/pending", {
                  method: "POST",
                  body: JSON.stringify({ nodeHash: node.nodeHash }),
                  headers: { "Content-Type": "application/json" },
                })
              ).json();
              const mtData = await (await fetch("/abi/MemoryTree.json")).json();
              const mt = new ethers.Contract(
                mtData.address,
                mtData.abi,
                provider.getSigner()
              );
              const tx =
                node.parentNodeId === null
                  ? // New mem tree
                    await mt.addMemoryTree(...params)
                  : // New node
                    await mt.addNode(...params);
              await tx.wait();
              window.alert("Added node to mem tree!");
            });
            brainP.appendChild(el);
          } else {
            // Already pinned
            el = document.createElement("span");
            el.textContent = "Pinned";
            brainP.appendChild(el);
            // Add to memory dropdown
            const opt = document.createElement("option");
            opt.text = `Memory #${node.nodeId}`;
            opt.value = node.nodeId;
            memSel.appendChild(opt);
          }
          brainP.appendChild(document.createElement("br")); // spacer
          // Process children
          node.children?.forEach((m) =>
            appendChildMemories(m, indentation + 1)
          );
        };
        memories.forEach((m) => appendChildMemories(m, 0));
        return brainP;
      };

      for (let i = 0; i < brainBal; i++) {
        const brainId = (
          await brains.tokenOfOwnerByIndex(connectedAddr, i)
        ).toNumber();
        // Add to dropdown
        const opt = document.createElement("option");
        opt.text = `Brain #${brainId}`;
        opt.value = brainId;
        sel.appendChild(opt);
        // Add to panel
        brainsDiv.appendChild(await createBrainPanel(brainId));
      }

      // Load ASTO
      const astoData = await (await fetch("/abi/MockedERC20.json")).json(); //FIXME replace with real abi
      const asto = new ethers.Contract(
        astoData.address,
        astoData.abi,
        provider.getSigner()
      );
      // User balance
      const balance = await asto.balanceOf(connectedAddr);
      document.getElementById("asto").textContent =
        ethers.utils.formatEther(balance); // 10^18
      const crmData = await (
        await fetch("/abi/ComputeRequestManager.json")
      ).json();
      // Check amount approved for Compute Request Manager to access
      const approved = await asto.allowance(connectedAddr, crmData.address);
      document.getElementById("approved").value =
        ethers.utils.formatEther(approved);

      // Show content
      document.getElementById("connect-section").classList.add("gone");
      document.getElementById("main").classList.remove("gone");
    } catch (err) {
      console.error(err);
    }
  });

  // Update Compute Request Manager Protocol ASTO allowance
  document
    .getElementById("allowance-btn")
    .addEventListener("click", async () => {
      const astoData = await (await fetch("/abi/MockedERC20.json")).json(); //FIXME replace with real abi
      const asto = new ethers.Contract(
        astoData.address,
        astoData.abi,
        provider.getSigner()
      );
      const crmData = await (
        await fetch("/abi/ComputeRequestManager.json")
      ).json();
      const amount = ethers.BigNumber.from(10)
        .pow(18)
        .mul(document.getElementById("approved").value); // 10^18
      const tx = await asto.approve(crmData.address, amount);
      await tx.wait();
      window.alert("Allowance updated!");
    });

  // Request compute
  document.getElementById("train-btn").addEventListener("click", async () => {
    // Get request data
    const brainsData = await (await fetch("/abi/MockedERC721.json")).json(); //FIXME replace with real abi
    const brainAddr = brainsData.address;
    const sel = document.getElementById("brain-select");
    const memSel = document.getElementById("memory-select");

    // Prep the training request from the server
    const body = {
      addr: brainAddr,
      id: sel.options[sel.selectedIndex].value,
      parentNodeId: memSel.options[memSel.selectedIndex].value,
      params: {
        Performance: "High",
      },
    };
    const trainingData = await (
      await fetch("/training", {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      })
    ).json();

    // Submit tx
    const crmData = await (
      await fetch("/abi/ComputeRequestManager.json")
    ).json();
    const crm = new ethers.Contract(
      crmData.address,
      crmData.abi,
      provider.getSigner()
    );
    const computeManagerAddr = (
      await (await fetch("/abi/ComputeManagerSimple.json")).json()
    ).address; //FIXME replace with real address
    const tx = await crm.requestCompute(
      computeManagerAddr,
      0,
      parseInt(document.getElementById("units").value),
      trainingData.computeHash
    );
    await tx.wait();
    window.alert("Training request submitted!");
  });
});
