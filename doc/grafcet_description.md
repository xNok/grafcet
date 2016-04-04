Grafcet description
===

Ce document décrit la choix de description utiliser pour le grafcet

# Liste d'adjacence

La liste d'adjacence à cette avantage de nous permettre de parcourir le grafcet de proche en proche

Pour chaque sommet nous avons les information suivantes :
* l'action à réaliser
* le nombre de transition a vérifier -> nbr_adj
* la liste des étapes voisine et de la condition pour l'attendre

la description d

```javascript
var AdjList = {
  nbr_vertices: n,
  adjList: {
    1: {
      action: "KM1",
      nbr_adj: m,
      adj: {
        2: {type,transition},
        ...
      }
    },
    ...
  }
}
```

Complexité mémoire: 1+n*(3+m*3) = 1+3n+3nm
