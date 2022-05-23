require('@nomiclabs/hardhat-waffle')

module.exports = {
  solidity: '0.8.4',
  networks: {
    rinkeby: {
      url:"https://eth-rinkeby.alchemyapi.io/v2/TezJd0aDLSWlwt6Sihgtzh-EHi5Yq4Wd",
      accounts: [
        "d1f463c54b8d84bf056a9e512aab379d81afa18cf71e96a7459cbf516789ac5d"
      ],
    },
  },
}
