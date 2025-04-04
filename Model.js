const path_progetti = './Progetti.json';
const path_alberi = './Alberi.json';

//funzione per caricare i progetti nel menù a tendina
export async function getProgetti() {
    try {
        const conversione = await fetch(path_progetti);
        if (!conversione.ok)
            throw new Error('Errore nel recupero dei progetti');

        //conversione dei dati dal formato JSON
        var model = await conversione.json();
        return model.progetti;
    } catch (error) {
        console.error('Errore:', error);
        return [];
    }
}

//funzione per caricare gli alberi associati al progetto
export async function getAlberi(id) {
    try {
        const conversione = await fetch(path_alberi);
        if (!conversione.ok)
            throw new Error('Errore nel recupero degli alberi');

        //conversione dei dati dal formato JSON
        const model = await conversione.json();

        //filtra gli alberi in base all'id del progetto
        return model.alberi.filter(albero => albero.id_progetto === id);
    } catch (error) {
        console.error('Errore:', error);
        return [];
    }
}


