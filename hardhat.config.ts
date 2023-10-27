import {HardhatUserConfig} from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from 'dotenv'

dotenv.config();

const config: HardhatUserConfig = {
    solidity: {
        compilers: [
            {
                version: "0.8.18",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                    evmVersion: "istanbul"
                }
            },
        ]
    },
    // defaultNetwork: 'dev',
    networks: {
        hardhat: {
            // make gasPrice=0 valid in contract test
            initialBaseFeePerGas: 0
        },
        arbitrum_goerli: {
            url: process.env.ARBITRUM_GOERLI_RPC_URL,
            accounts:
                [process.env.ARBITRUM_GOERLI_PRIVATE_KEY!],
            chainId: 421613
        },
        arbitrum_one: {
            url: process.env.ARBITRUM_RPC_URL,
            accounts:
                [process.env.ARBITRUM_PRIVATE_KEY!],
            chainId: 42161
        },
        eth_mainnet: {
            url: process.env.ETH_MAINNET_RPC_URL,
            accounts:
                [process.env.ETH_PRIVATE_KEY!],
            chainId: 1
        }
        //   rinkeby: {
        //     url: process.env.RINKEBY_URL,
        //     accounts:
        //         [process.env.GOERLI_PRIVATE_KEY],
        //     chainId: 4
        //   }
    },

    gasReporter: {
        enabled: !!(process.env.REPORT_GAS),
        currency: 'USD',
        gasPrice: 10
    },

    etherscan: {
        apiKey: {
            arbitrumGoerli: process.env.ARBISCAN_API_KEY!,
            arbitrumOne: process.env.ARBISCAN_API_KEY!
        }
    }
};

export default config;