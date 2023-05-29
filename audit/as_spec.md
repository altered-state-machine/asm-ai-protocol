# Asset Stats Specification

Status:

- [ ] DRAFT
- [x] APPROVED
- [x] SUBMITTED
- [ ] AUDITED
- [ ] PASSED & PUBLIC

## General

An Asset can be any token identifiable with an address and id (e.g. ERC721 or ERC1155). This contract is intentionally broad in its scope so as to support the metadata growth of as many use cases as possible.

While this contract does not require the Asset to conform to a particular standard (e.g. ERC721), downstream functionality that leverages Asset Stats MAY require it.

## Asset Stats - WIP

The URI SHOULD point to a JSON file that conforms to the following JSON schema. These stats SHOULD be updated in real-time.

The URI SHOULD return a 404 if the address and/or token id provided is not supported.

```json
{
  "execution_environment_name": "The Next Legend",
  "name": "Brain #123",
  "description": "Lorem ipsum...",
  "image": "ipfs://hash",
  "properties": [
    {
      "type": "count",
      "name": "tnl_wins",
      "display_name": "TNL Wins",
      "value": 10,
    },
    ...
  ]
}
```

The table below explains the values above. Note that none of the fields in the JSON schema are required.

**[*Omitted!*]**
