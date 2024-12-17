# This repository contains the Solidity smart contracts and associated JavaScript tests for the paper: [The Price of Smart Contract Privacy](https://minesparis-psl.hal.science/hal-04702045v1) 

## Abstract: 
Smart contracts face a significant challenge regarding the data transparency inherent to the blockchain-based decentralized systems on which they run. This transparency can limit the potential applications and use cases of smart contracts, especially when privacy and confidentiality are
paramount. Presently, blockchain applications that require a certain level of privacy will tend to rely on off-chain, centralized solutions. However, this approach introduces trade-offs, potentially compromising the trust and security provided by blockchain technology.

In this article, we advocate for the integration of cryptographic tools into smart contracts, aiming to enhance privacy and address transparency concerns in applications. We introduce the
notion of a Privacy Framework (PF) as the general building block that addresses privacy issues in smart contracts by linking privacy requirements and adequate implementations. Since auction are
important applications that strongly rely on privacy for reaching their full potential, we adopt in this paper the auction known as Vickrey–Clarke–Groves(VCG) Auction for Sponsored Search as a use case
to develop the notion of PFs. In practice, we provide three PF instances, of increasing complexity, to improve the privacy assurances of specific auction smart contracts. Our experimental assessment
of these PF instances suggest they are efficient, not only in terms of privacy preservation, but also in gas and monetary cost, two crucial factors for the viability of smart contracts.

## Contents:

### Contracts:
- VCG.sol: base VCG.
- VCG_separated_result.sol: base VCG with separated results.
- vcgCR.sol: VCG with commit-reveal PF instance.
- vcgCR_separated_result.sol: VCG with commit-reveal PF instance with separated results.
- vcgDH.sol: VCG with shared key PF instance.
- vcgMixer.sol: VCG with mixer PF instance.


### Tests:
The tests were executed in Truffle version v5.3.14, with the JavaScript Solidity compiler Solc-js,
version 0.8.1.
- 0_vcg.js
- 1_vcg_separated_result.js
- 2_vcgcr.js
- 3_vcgcr_separated.js
- 4_vcgdh.js
- 5_mixervcg.js
- SmartDHX.js: for Diffie–Hellman key exchange.
- ctrs.js: ctrs for the VCG auction.
- seeds.js: seeds for key generation.
