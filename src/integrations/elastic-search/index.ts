import CreateRecord from './createRecord';
import SearchRecord from './searchRecord';


export default class ElasticSearch {
  public CreateRecord: CreateRecord;
  public SearchRecord: SearchRecord;

  public constructor() {
    this.CreateRecord = new CreateRecord();
    this.SearchRecord = new SearchRecord();
  }
}
