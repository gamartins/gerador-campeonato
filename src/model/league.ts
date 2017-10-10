import { Player } from "./player";
import { Match } from "./match";

export class League {
    public matches;

    constructor(public name: string,
                public players: Array<Player>,
                public leagueType: number) {
        this.createRoundRobinLeague()
    }

    private createRoundRobinLeague(){
        this.matches = []
        this.players.forEach(home => {
            let oponents = this.listOponents(home)
            oponents.forEach(oponent => this.matches.push(this.createMatch(home, oponent)))
        });     
    }

    private listOponents(home) {
        return this.players.filter(player => home !== player )
    }

    private createMatch(home, visitor) {
        let round = 1
        while (this.haveMatchInRound(home, visitor, round)) round++
        return { 
            home: home,
            homeGoals: null,
            visitor: visitor,
            visitorGoals: null,
            round: round
        }
    }

    private haveMatchInRound(player1, player2, round) {
        let haveMatch = false
        let roundMatches = this.getMatchesOfRound(round)
        roundMatches.forEach(match => {
            match.home == player1 || match.visitor == player1 ? haveMatch = true : ''
            match.home == player2 || match.visitor == player2 ? haveMatch = true : ''
        });

        return haveMatch
    }

    private getMatchesOfRound(round){
        return this.matches.filter(match => match.round === round )
    }
}