const defineSpecimenId = (specimen: string | string[]) => {
  let specimenIdArray;

  if (!Array.isArray(specimen)) {
    specimenIdArray = [specimen];
  } else {
    specimenIdArray = specimen;
  }

  return specimenIdArray;
};

export default defineSpecimenId;
