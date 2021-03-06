
import React from "react"
import { Link } from "react-router-dom"
import Action from "./Action"
import Stat from "../Stat"

import player_img from "../../resources/player.jpg"

// action svg's
import { ReactComponent as ActionMelee } from "../../resources/icons/actions/action_melee.svg"
import { ReactComponent as ActionRangedLight } from "../../resources/icons/actions/action_ranged_light.svg"
import { ReactComponent as ActionRangedMedium } from "../../resources/icons/actions/action_ranged_medium.svg"
import { ReactComponent as ActionRangedStrong } from "../../resources/icons/actions/action_ranged_strong.svg"

import levelTresholds from "../../data/levelTresholds"

class Player extends React.Component {

    state = { meleeDodge: 0, rangedDodge: 0 }

    componentDidMount() {
        this.setState({
            meleeDodge: this.props.enemy.meleeDodgeChance,
            rangedDodge: this.props.enemy.rangedDodgeChance
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.enemy.meleeDodgeChance !== this.props.enemy.meleeDodgeChance) {
            this.setState({ 
                meleeDodge: this.props.enemy.meleeDodgeChance,
                rangedDodge: this.props.enemy.rangedDodgeChance
            })
        }
    }

    render() {

        const currentLevel = this.props.level.currentLevel

        // HP and XP fill
        const hpPerc = (this.props.player.currentHp / this.props.player.maxHp) * 100
        const xpPerc = (this.props.level.experience / levelTresholds[currentLevel].xp) * 100

        const hpFillColor = "rgb(220, 0, 0)" 
        const xpFillColor = "rgb(0, 191, 255)" 

        const hpBgColor = "rgb(75, 0, 0)" 
        const xpBgColor = "rgb(0, 37, 122)" 

    
        const fillStyle = (perc, fillColor, bgColor) => {
            return {
                background: "linear-gradient(to right, " + fillColor 
                + perc + "%, " + bgColor 
                + perc + "%)"
            }
        }
    
        const critClass = this.props.player.receivedCrit ? " crit" : ""
    
        return(
            <div className="character_container" id="player">
    
                <div className="top_container">
    
                    <img alt="" src={player_img} />
    
                    <div className="info">
                        <p className="name">Player</p>
                        <p className="level" style={fillStyle(xpPerc, xpFillColor, xpBgColor)}>{currentLevel}</p>
                        <p className="hp" style={fillStyle(hpPerc, hpFillColor, hpBgColor)}>{this.props.player.currentHp}/{this.props.player.maxHp}</p>
                    </div>
    
                    <p className={"floating_damage" + critClass} id="fl_dmg_player" style={{display: this.props.player.damageTaken === "" ? "none" : "block"}}>
                        {this.props.player.damageTaken}
                    </p>
    
                </div>
    
                <div className="stats">
                    <div className="wrapper">
                        <ul>
                            <Stat name="HP:" value={this.props.player.maxHp} />
                            <Stat name="Armor:" value={this.props.player.armor} />
                            <Stat name="M-DMG:" value={this.props.player.meleeDamage} />
                            <Stat name="R-DMG:" value={this.props.player.rangedDamage} />
                            <Stat name="Crit(%):" value={this.props.player.critChance} />
                            <Stat name="Block(%):" value={this.props.player.blockChance} />
                        </ul>
                        <ul>
                            <Stat name="Beasts:" value={this.props.player.bonuses[0].value} />
                            <Stat name="Dragons:" value={this.props.player.bonuses[1].value} />
                            <Stat name="Insect:" value={this.props.player.bonuses[2].value} />
                            <Stat name="Monsters:" value={this.props.player.bonuses[3].value} />
                            <Stat name="Reptiles:" value={this.props.player.bonuses[4].value} />
                        </ul>
                    </div>
                </div>

                <div className="forfeit_container">
                    <Link to="/menu"><div>FF</div></Link>
                </div>
    
                <div className="actions" style={{display: this.props.canAttack === true ? "flex" : "none"}}>
                    
                    <div className="melee_column">
                        <Action data={{ id: "ml", type: "melee", strength: "light", icon: <ActionMelee/> }} dodge={this.state.meleeDodge} gameManager={this.props.gameManager} />
                        <Action data={{ id: "mm", type: "melee", strength: "medium", icon: <ActionMelee /> }} dodge={this.state.meleeDodge} gameManager={this.props.gameManager} />
                        <Action data={{ id: "ms", type: "melee", strength: "strong", icon: <ActionMelee /> }} dodge={this.state.meleeDodge} gameManager={this.props.gameManager} />
                    </div>
    
                    <div className="ranged_column">
                        <Action data={{ id: "rl", type: "ranged", strength: "light", icon: <ActionRangedLight/> }} dodge={this.state.rangedDodge} gameManager={this.props.gameManager} />
                        <Action data={{ id: "rm", type: "ranged", strength: "medium", icon: <ActionRangedMedium/> }} dodge={this.state.rangedDodge} gameManager={this.props.gameManager} />
                        <Action data={{ id: "rs", type: "ranged", strength: "strong", icon: <ActionRangedStrong/> }} dodge={this.state.rangedDodge} gameManager={this.props.gameManager} />
                    </div>
    
                </div>
            </div>
        )
    }
}

export default Player