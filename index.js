#!/usr/bin/env node

import chalk from "chalk";
import figlet from "figlet";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import { createSpinner } from "nanospinner";

let playername;

const sleep = (milliseconds = 2000) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow(
        'Who wants to be a JS millionaire? \n'
    );
    
    await sleep();
    rainbowTitle.stop();

    console.log(`
        ${chalk.blueBright(figlet.textSync('JS Millionaire', { horizontalLayout: 'full' }))}
        ${chalk.blue('How to play')}
        I am a process on your computer.
        If you get any questions wrong, you will be ${chalk.red('killed')}.
        So you better get them right!
    `);
}   

async function askName() {
    const { name } = await inquirer.prompt([
        {
            type: 'input',
            name: 'player_name',
            message: 'What is your name?',
            default: 'Player',
        },
    ]);
    playername = name;
} 

async function question1() {
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'question1',
            message: 'What is the output of the following code? \n console.log(1 + 1 + "1" + 1 + 1);',
            choices: [
                { name: '11111', value: 'wrong' },
                { name: '1112', value: 'wrong' },
                { name: '221', value: 'wrong' },
                { name: '2111', value: 'correct' },

            ],
        },
    ]);
    return answers.question1 === 'correct';
}

const handleAnswer = async (isCorrect) => {
    const spinner = createSpinner('Checking answer...').start();
    await sleep();

    if (isCorrect) {
        spinner.success({text: `Nice work ${playername}!`})
    } else {
        spinner.error({text: `Sorry ${playername}, you are 💀!`})
        process.exit(1)
    }
}

function winner( ) {
    console.clear();
    const msg = `Congrats ${playername}! \n You won money!`;
    figlet(msg, (err, data) => {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(gradient.pastel.multiline(data));
    });
}
await welcome();
await askName();
await question1().then(handleAnswer);
await winner();