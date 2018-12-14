export class StationsPageModel {
    generalInputTypes: {}
    selectedGeneralInputType: number;

    constructor() {
        this.generalInputTypes = [
            {'id':0, 'name': "Browse Inventory"},
            {'id':1, 'name': "User supplied"}
        ];
    }
}