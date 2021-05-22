import events from './events.json';
import categories from './categories.json';
import nominees from './/nominees.json';

export const getVotingEvents = async () => {
    return events.eventsList;
}

export const getEventDetail = async (eventId) => {
    let event = events.eventsList.filter( (e) => eventId === e.id )[0]
    event.categories = categories.categoriesList;
    return  event;
}

export const getEventCategoryDetail = async (eventId,categoryId) => {

    let event = events.eventsList.filter( (e) => eventId === e.id )[0]
    event.categories = categories.categoriesList;

    event.category = event.categories.filter((c) => categoryId === c.id)[0]
    event.category.nominees = nominees.nomineesList;
    
    return  event;

}

export const getEventCategoryNomineeDetail = async (nomineeId) => {
    let nominee = nominees.nomineesList.filter( (n) => nomineeId === n.id)[0]
    
    return nominee;
}
