export class Tag{

  tagId: number;
  content: string;
  batchId: number;
  weekNum: number;

  constructor(tagId: number, content: string, batchId: number, weekNum: number){
    this.tagId = tagId;
    this.content = content;
    this.batchId = batchId;
    this.weekNum = weekNum;
  }
}
