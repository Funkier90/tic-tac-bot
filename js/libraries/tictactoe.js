const X = "x"
const O = "o"
const VIDE = " "

function gagnant(jeu) {
    // horizontal
    if (jeu[0][0] !== VIDE && jeu[0][0] === jeu[0][1] && jeu[0][0] === jeu[0][2]) {
        return jeu[0][0]
    }
    if (jeu[1][0] !== VIDE && jeu[1][0] === jeu[1][1] && jeu[1][0] === jeu[1][2]) {
        return jeu[1][0]
    }
    if (jeu[2][0] !== VIDE && jeu[2][0] === jeu[2][1] && jeu[2][0] === jeu[2][2]) {
        return jeu[2][0]
    }

    // vertical
    if (jeu[0][0] !== VIDE && jeu[0][0] === jeu[1][0] && jeu[0][0] === jeu[2][0]) {
        return jeu[0][0]
    }
    if (jeu[0][1] !== VIDE && jeu[0][1] === jeu[1][1] && jeu[0][1] === jeu[2][1]) {
        return jeu[0][1]
    }
    if (jeu[0][2] !== VIDE && jeu[0][2] === jeu[1][2] && jeu[0][2] === jeu[2][2]) {
        return jeu[0][2]
    }

    // diagonal
    if (jeu[0][0] !== VIDE && jeu[0][0] === jeu[1][1] && jeu[0][0] === jeu[2][2]) {
        return jeu[0][0]
    }
    if (jeu[0][2] !== VIDE && jeu[0][2] === jeu[1][1] && jeu[0][2] === jeu[2][0]) {
        return jeu[0][2]
    }

    return false
}

function match_nul(jeu) {
    return coups_valides(jeu).length == 0
}

function coups_valides(jeu) {
    let coups = []

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (jeu[i][j] === VIDE) {
                coups.push({ x: j, y: i })
            }
        }
    }

    return coups
}

function copy_jeu(jeu) {
    return [jeu[0].slice(), jeu[1].slice(), jeu[2].slice()]
}

function get(jeu, x, y) {
    return jeu[y][x]
}

function set(jeu, x, y, joueur) {
    if (jeu[y][x] != VIDE) {
        throw new Error(`Coup invalide à ${x}, ${y} par le joueur ${joueur}.`)
    }

    let nouveau_jeu = copy_jeu(jeu)
    nouveau_jeu[y][x] = joueur
    return nouveau_jeu
}

function log_jeu(jeu) {
    console.log(
        "\n " + jeu[0][0] + " ┃ " + jeu[0][1] + " ┃ " + jeu[0][2] + " " +
        "\n━━━╋━━━╋━━━\n" +
        " " + jeu[1][0] + " ┃ " + jeu[1][1] + " ┃ " + jeu[1][2] + " " +
        "\n━━━╋━━━╋━━━\n" +
        " " + jeu[2][0] + " ┃ " + jeu[2][1] + " ┃ " + jeu[2][2] + " \n "
    )
}

function log_simulation(fn_joueur_x, fn_joueur_o) {
    let jeu = [
        [VIDE, VIDE, VIDE],
        [VIDE, VIDE, VIDE],
        [VIDE, VIDE, VIDE],
    ]

    let g = null
    let nul = null

    for (let i = 0; i < 5; i++) {
        let coup_x = fn_joueur_x(jeu, X, i * 2 + 1)
        jeu = set(jeu, coup_x.x, coup_x.y, X)
        log_jeu(jeu)
        g = gagnant(jeu)
        nul = match_nul(jeu)
        if (g) break
        if (nul) break

        let coup_o = fn_joueur_o(jeu, O, i * 2 + 2)
        jeu = set(jeu, coup_o.x, coup_o.y, O)
        log_jeu(jeu)
        g = gagnant(jeu)
        nul = match_nul(jeu)
        if (g) break
        if (nul) break
    }

    if (g) {
        if (g === X) {
            console.log(`${fn_joueur_x.name} gagne avec le symbole: ${X}`)
        } else {
            console.log(`${fn_joueur_o.name} gagne avec le symbole: ${O}`)
        }
    } else if (nul) {
        console.log("Match nul!")
    } else {
        throw new Error("Cas non traité. Ne devrais jamais arriver")
    }
}

function simulation_stats(fn_joueur_x, fn_joueur_o, count = 10000) {
    let n_match_null = 0
    let n_x_gagnant = 0
    let n_o_gagnant = 0

    for (let c = 0; c < count; c++) {
        let g = null
        let nul = null
        let board_states = []

        let jeu = [
            [VIDE, VIDE, VIDE],
            [VIDE, VIDE, VIDE],
            [VIDE, VIDE, VIDE],
        ]

        for (let i = 0; i < 5; i++) {
            let coup_x = fn_joueur_x(jeu, X, i * 2 + 1)
            jeu = set(jeu, coup_x.x, coup_x.y, X)
            board_states.push(copy_jeu(jeu))
            g = gagnant(jeu)
            nul = match_nul(jeu)
            if (g) break
            if (nul) break

            let coup_o = fn_joueur_o(jeu, O, i * 2 + 2)
            jeu = set(jeu, coup_o.x, coup_o.y, O)
            board_states.push(copy_jeu(jeu))
            g = gagnant(jeu)
            nul = match_nul(jeu)
            if (g) break
            if (nul) break
        }

        if (g) {
            if (g === X) {
                n_x_gagnant++

                // Décommenter les lignes suivant pour savoir comment votre AI a perdu
                
                // for (let z = 0; z < board_states.length; z++) {
                //     log_jeu(board_states[z])
                // }
                // break
            } else {
                n_o_gagnant++
            }
        } else if (nul) {
            n_match_null++
        } else {
            throw new Error("Cas non traité. Ne devrais jamais arriver")
        }
    }

    console.log(`%c${fn_joueur_x.name.toUpperCase()} vs ${fn_joueur_o.name.toUpperCase()}`, "font-weight:bold;")
    console.log("=====================")
    console.log("Nombre de parties : " + count)
    console.log(`X gagner : ${n_x_gagnant} (${(n_x_gagnant / count * 100).toFixed(2)}%)`)
    console.log(`O gagner : ${n_o_gagnant} (${(n_o_gagnant / count * 100).toFixed(2)}%)`)
    console.log(`Matchs nuls : ${n_match_null} (${(n_match_null / count * 100).toFixed(2)}%)`)
}


