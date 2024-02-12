class UseLocalStorage {
  projectId: string;
  femaleVoterIdentifierVariableName: string;
  maleVoterIdentifierVariableName: string;
  femaleVoterNameVariableName: string;
  maleVoterNameVariableName: string;

  constructor(projectId: string) {
    this.projectId = projectId;
    this.femaleVoterIdentifierVariableName = `votedFemaleId ${this.projectId}`;
    this.maleVoterIdentifierVariableName = `votedMaleId ${this.projectId}`;

    this.femaleVoterNameVariableName = `femaleVotedName ${this.projectId}`;
    this.maleVoterNameVariableName = `maleVotedName ${this.projectId}`;
  }

  setFemaleVoted(contestantId: string, name: string) {
    localStorage.setItem(this.femaleVoterIdentifierVariableName, contestantId);
    localStorage.setItem(this.femaleVoterNameVariableName, name);
  }
  setMaleVoted(contestantId: string, name: string) {
    localStorage.setItem(this.maleVoterIdentifierVariableName, contestantId);
    localStorage.setItem(this.maleVoterNameVariableName, name);
  }

  getMaleVote() {
    return {
      maleId: localStorage.getItem(this.maleVoterIdentifierVariableName),
      maleVotedName: localStorage.getItem(this.maleVoterNameVariableName),
    };
  }
  getFemaleVote() {
    return {
      femaleId: localStorage.getItem(this.femaleVoterIdentifierVariableName),
      femaleVotedName: localStorage.getItem(this.femaleVoterNameVariableName),
    };
  }
}
export { UseLocalStorage };
