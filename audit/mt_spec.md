# Memory Tree Specification

Status:

- [ ] DRAFT
- [x] APPROVED
- [x] SUBMITTED
- [ ] AUDITED
- [ ] PASSED & PUBLIC

## General

A Memory Tree Contract MAY contain multiple memory trees for multiple brains across multiple brain contracts. A memory tree is a collection of memories stored in a non-linear hierarchical structure.

Memory trees MUST be stored against ERC721 assets.

A memory SHOULD include a reference to an AI model. The reference MAY also hold additional data related to the memory (such as performance and training stats).

Each contract SHOULD be related to a particular execution environment. An exception could be for models that are capable of running in multiple environments.

## Node Management

The Owner of the related ERC721 MUST be able to add new nodes and memory trees. The Execution Environment Custodian SHOULD validate and sign the input parameters to authorise these changes. Note: This is an off-chain interaction.

The Execution Environment Custodian SHOULD NOT add any functions that allow modification to the memory trees and nodes without the Owner’s explicit permission.

## Node Storage

Memory tree nodes SHOULD point to a location in decentralised storage (such as IPFS or Arweave). The storage location MAY be updated from time to time.

The storage location SHOULD include any machine learning model. The model in storage MAY be encrypted. The Execution Environment Custodian SHOULD offer a mechanism for the Brain Owner to decrypt and export the machine learning model. Note: This is an off-chain interaction.

The storage location SHOULD include statistics associated with the model.
