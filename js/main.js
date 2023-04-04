
function ai(jeu, joueur, tour,centre) {
    let coups_possibles = coups_valides(jeu)   
    // console.log(coups_possibles)
    let edges = [
        {x:1,y:0},
        {x:0,y:1},
        {x:2,y:1},
        {x:1,y:2}
    ]

    let corner = [
        {x:0,y:0},
        {x:2,y:0},
        {x:0,y:2},
        {x:2,y:2}
    ]
    
    if(tour == 1){
        return coups_possibles[0]
    }
    if(tour == 3 && get(jeu,1,1) == O){
        return {x:2 , y:2}
    }

    if(tour == 5){
        if(get(jeu,2,0) == VIDE){
            return {x:2,y:0}
        }
        if(get(jeu,0,2) == VIDE){
            return {x:0,y:2}
        }
    }

    if(tour == 7){
        if(get(jeu,1,0) == VIDE){
            return {x:1,y:0}
        }
        if(get(jeu,1,2) == VIDE){
            return {x:1,y:2}
        }
    }

    
    if(tour == 2 && get(jeu,1,1) == VIDE ){
        return {
            x:1,
            y:1,
        }
    }

    if(tour == 4){
        for(let edge of edges){
            if(get(jeu,edge.x,edge.y)== VIDE){
                return {x:edge.x,y:edge.y}
            }
        }
    }
    
    
    return coups_possibles[0]

}

// simulation_stats(ai, ai_niveau_1, 10000)
log_simulation(ai,ai_niveau_2)

// get(jeu,0,0) == x || get(jeu,2,0) == x || get(jeu,0,2) == x || get(jeu,2,2) == x 