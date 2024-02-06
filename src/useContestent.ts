export interface Contestant {
  _id: string;
  gender: "m" | "f";
  name: string;
}
class UseContestent {
  data: Contestant[] = [];
  maleContestant: Contestant[] = [];
  femaleContestant: Contestant[] = [];
  constructor() {
    this.get();
  }
  get() {
    this.data = [
      { _id: "id1", gender: "f", name: "Swenja" },
      { _id: "id2", name: "Tom", gender: "m" },
      { _id: "id3", gender: "f", name: "Alissa" },
      { _id: "id4", name: "Flo", gender: "m" },
      { _id: "id5", gender: "f", name: "Franzi" },
      { _id: "id6", name: "Martin", gender: "m" },
    ];

    this.destructureData();
  }
  destructureData() {
    this.femaleContestant = [];
    this.maleContestant = [];
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].gender == "f") this.femaleContestant.push(this.data[i]);
      else this.maleContestant.push(this.data[i]);
    }
  }
}
export default UseContestent;
