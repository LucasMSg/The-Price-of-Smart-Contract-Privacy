const ctrs = require('./ctrs.js');
const VCG = artifacts.require('VCG');

contract('Original VCG test', async (accounts) => {
  it('auction', async function () {
    const auctioneer = accounts[0];
    const bidders = [];
    for (let i = 0; i < accounts.length / 2; i++) {
      bidders.push(accounts[i + 1]);
    }

    //table
    const bids = [94, 95, 13, 17, 71];
    console.log('printing bids');
    console.log(bids);

    //deploying contract
    const vcgContract = await VCG.new();
    let receipt = await web3.eth.getTransactionReceipt(
      vcgContract.transactionHash
    );
    console.log('gas used for deployment ' + receipt.gasUsed.toString());

    //Functions
    async function bid(i) {
      let bidTx = await vcgContract.bid(bids[i], {from: bidders[i]});
      console.log('bid ' + i + ' gas ' + bidTx.receipt.gasUsed);
    }

    async function openAuction() {
      const openAuctionTx = await vcgContract.openAuction(
        ctrs.ctrs /* [3, 2, 1] */,
        {
          from: auctioneer,
        }
      );
      console.log('open auction gas ' + openAuctionTx.receipt.gasUsed);
    }

    async function closeAuction() {
      let winners = [];
      let prices = [];

      const finalResult = await vcgContract.closeAuction({
        from: auctioneer,
      });
      console.log('close auction gas ' + finalResult.receipt.gasUsed);

      winners = finalResult.logs[0].args.agents;
      pricesInBNFormat = finalResult.logs[0].args.prices;

      for (let i = 0; i < pricesInBNFormat.length; i++) {
        prices.push(pricesInBNFormat[i].toNumber());
      }
      return {winners, prices};
    }

    async function executePayemnt(i) {
      let j = 0;
      while (winners[i] != bidders[j]) {
        j++;
      }
      let payment = await vcgContract.payment({
        from: bidders[j],
        value: prices[i],
      });
      console.log(bidders[j] + ' payed ' + prices[i]);
      console.log('payment gas ' + payment.receipt.gasUsed);
    }

    //Auction execution
    await openAuction();

    for (let i = 0; i < bidders.length; i++) {
      await bid(i);
    }

    const {winners, prices} = await closeAuction();
    for (let i = 0; i < prices.length; i++) {
      await executePayemnt(i);
    }
  });
});
