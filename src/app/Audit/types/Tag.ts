export class Tag{

  tagId: number;
  content: string;
  batchId: number;
  weekNum: number;
  active: boolean;

  constructor(tagId: number, content: string, batchId: number, weekNum: number, active: boolean){
    this.tagId = tagId;
    this.content = content;
    this.batchId = batchId;
    this.weekNum = weekNum;
    this.active = active;
  }
}
