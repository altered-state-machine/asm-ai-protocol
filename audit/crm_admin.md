# Compute Request Manager Administration

Status:

- [ ] DRAFT
- [x] APPROVED
- [x] SUBMITTED
- [ ] AUDITED
- [ ] PASSED & PUBLIC

## Overview

The Compute Request Manager includes administration functions that are only able to be performed by an address with the `MANAGER_ROLE`.

## Update Request

The manager can update the escrow amount and status of any compute request using `managerUpdateRequest`.

This is for emergency use only.

## Revoke Compute

The manager can revoke a compute request on behalf of any user using `managerRevokeCompute`.

This is for emergency use only.

## Set DAO Fee

The manager can set the DAO fee using `managerSetDaoFee`.
Note: The DAO fee is calculated using a `max(minFee, cost * percentageFee)`.

## Correct Balance

The manager can correct the balance store in the Compute Request Manager for any account using `managerCorrectBalance`.

This is for emergency use only.

## Withdraw Balance

The manager can withdraw ASTO held by the Compute Request Manager using `managerWithdrawASTO`.

This is for emergency use only.
