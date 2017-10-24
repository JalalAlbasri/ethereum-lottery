var Migrations = artifacts.require("./EthereumLottery.sol");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
