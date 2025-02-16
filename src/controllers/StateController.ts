import firestore from '@react-native-firebase/firestore';

class StateController {
  states: [];
  constructor() {
    this.states = []; 
  }

  async fetchStatesFromDataUSA() {
    try {
      const response = await fetch(
        'https://datausa.io/api/data?drilldowns=State&measures=Population&year=latest',
      );
      const data = await response.json();

      this.states = data.data.map(item => ({
        name: item.State,
        population: item.Population,
        id: item['ID State'],
      }));

      console.log('✅ Fetched states from DataUSA');
      return this.states;
    } catch (error) {
      console.error('❌ Error fetching states from DataUSA:', error);
      return [];
    }
  }

  async fetchAndSaveStateData() {
    if (this.states.length === 0) {
      console.warn('⚠️ No states available, fetching from DataUSA...');
      await this.fetchStatesFromDataUSA();
    }

    const batch = firestore().batch();
    const collectionRef = firestore().collection('state_data');

    for (let stateObj of this.states) {
      const stateName = stateObj.name;
      const wikiState = stateName.replace(/\s+/g, '_'); 

      try {
        const response = await fetch(
          `https://en.wikipedia.org/api/rest_v1/page/media-list/Flag_of_${wikiState}`,
        );
        const data = await response.json();
        
        let flagUrl =
          data.items?.find(item => item.type === 'image')?.srcset?.[0]?.src ||
          data.items?.find(item => item.type === 'image')?.original?.source ||
          null;

  
        if (flagUrl && flagUrl.startsWith('//')) {
          flagUrl = 'https:' + flagUrl;
        }
   
        const stateData = {
          state: stateName,
          flagUrl,
          population: stateObj.population,
          stateId: stateObj.id,
        };

        const docRef = collectionRef.doc(stateName);
        batch.set(docRef, stateData);

        console.log(`✅ Saved ${stateName}:`, stateData);
      } catch (error) {
        console.error(`❌ Error fetching flag for ${stateName}:`, error);
      }
    }

    try {
      await batch.commit();
      console.log('🎉 All state data saved to Firestore!');
    } catch (error) {
      console.error('❌ Error saving to Firestore:', error);
    }
  }

  async getStateData() {
    try {
      const snapshot = await firestore().collection('state_data').get();
      const states = snapshot.docs.map(doc => doc.data());

      console.log('📥 Fetched state data from Firestore:', states);
      return states;
    } catch (error) {
      console.error('❌ Error fetching state data from Firestore:', error);
      return [];
    }
  }
}

export default StateController;
