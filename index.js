#!/usr/bin/env node
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";
import figlet from "figlet";
import { createDeck, shuffle, draw, getData, sum } from "./utils/index.js";
import { createSpinner } from "nanospinner";
import gradient from "gradient-string";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms * 1000));

let deck = createDeck();
let playerHand = [];
let dealerHand = [];
shuffle(deck);

for (let i = 0; i < 4; i++) {
  if (i % 2 == 0) {
    draw(deck, playerHand);
  } else {
    draw(deck, dealerHand);
  }
}

let name;
async function askName() {
  let str = chalkAnimation.karaoke("What's your name?");
  await sleep(1);
  let nameReq = await inquirer.prompt({
    name: "str",
    type: "input",
    message: "name?",
    default() {
      return "User";
    },
  });
  str.stop();
  name = nameReq.str;
}

let bet;
async function placeBet() {
  let str = chalkAnimation.neon(`Place your bet, ${name}!`);
  await sleep(1);
  let betReq = await inquirer.prompt({
    name: "amount",
    type: "input",
    message: "bet?",
    default() {
      return "number";
    },
  });
  bet = Number(betReq.amount);
  if (isNaN(bet) || bet + bet < 0 || bet % 1 != 0) {
    console.log(chalk.red(`${betReq.amount} is not a valid bet!`));
    await placeBet();
    return false;
  }
  str.stop();
}

async function hitOrStand(hand = playerHand) {
  if (hand == playerHand) {
    let choice;
    let req = await inquirer.prompt({
      name: "choice",
      type: "list",
      choices: ["Hit", "Stand"],
    });
    choice = req.choice;

    if (choice == "Hit") {
      console.clear();
      let card = draw(deck, playerHand);
      console.log(chalk.green(`You drew a ${card.str}!`));
      console.log(getData(playerHand, dealerHand, name));
      if (sum(playerHand) > 21) {
        await dealerTurn();
      } else {
        await hitOrStand();
      }
    } else {
      await dealerTurn();
    }
  } else {
    console.log(
      chalk.green(`The dealer's secret card was ${dealerHand[1].str}!`)
    );
    console.log(getData(playerHand, dealerHand, name, false));
    await sleep(1.5);
    while (sum(dealerHand) < 17) {
      await sleep(1.5);
      console.clear();
      let card = draw(deck, dealerHand);
      console.log(chalk.green(`The dealer drew a ${card.str}!`));
      console.log(getData(playerHand, dealerHand, name, false));
    }
    await sleep(1.5);
    end();
  }
}

async function playerTurn() {
  console.clear();
  console.log(getData(playerHand, dealerHand, name));
  await hitOrStand();
}

async function dealerTurn() {
  await sleep(1);
  console.log(sum(playerHand) > 21 ? "You busted!" : "You stood!");
  await sleep(2);
  console.clear();
  await hitOrStand(dealerHand);
}

async function end() {
  let pSum = sum(playerHand);
  let dSum = sum(dealerHand);
  let winner;

  if (pSum > dSum && pSum <= 21) {
    winner = "user";
  } else if (dSum > pSum && dSum <= 21) {
    winner = "dealer";
  } else if (pSum <= 21 && dSum > 21) {
    winner = "user";
  } else if (pSum > 21) {
    winner = "dealer";
  } else if (pSum == dSum) {
    winner == "push";
  }

  console.clear();
  if (winner == "user") {
    figlet(`GG ${name}!\nYou won ${bet * 2}$ !!`, (e, str) => {
      console.log(gradient.cristal(str));
    });
  } else if (winner == "dealer") {
    figlet(`GG ${name}!\nYou lost!`, (e, str) => {
      console.log(gradient.cristal(str));
    });
  } else {
    figlet("It's a push!", (e, str) => {
      console.log(gradient.cristal(str));
    });
  }
}
await askName();
await placeBet();
let spinner = createSpinner("Dealing cards...").start();
await sleep(3);
spinner.stop();
await playerTurn();
