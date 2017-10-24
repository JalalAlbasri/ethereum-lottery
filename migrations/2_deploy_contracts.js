var EthereumLottery = artifacts.require("./EthereumLottery.sol");

module.exports = function (deployer) {
  deployer.deploy(EthereumLottery);
};
