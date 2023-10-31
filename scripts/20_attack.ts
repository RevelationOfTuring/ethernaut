import {ethers} from "hardhat"
import dotenv from 'dotenv'
import {AlienCodex} from "../typechain-types";

dotenv.config()

async function main() {
    const isLocalTest = false

    let target: AlienCodex
    if (isLocalTest) {
        target = await ethers.deployContract('AlienCodex')
    } else {
        target = await ethers.getContractAt('AlienCodex', process.env.TARGET_ADDRESS_20!)
    }

    console.log(`owner address: ${await target.owner()}`)
    // deploy attack
    await ethers.deployContract('AttackAlienCodex',[target.target])
    console.log(`owner address: ${await target.owner()}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
