const generatePropertyArea=(landArea)=>{
    let propertyArea;
    let ropani;
    let aana;
    ropani= Math.floor(landArea/16);
    aana= landArea%16;
    propertyArea=`${ropani} ropani,${aana} aana`;
    return propertyArea;

}

const convertRopaniAanaToArea=async(ropani,aana)=>{
    let area=await ropani*16+aana;
    return area;

}
module.exports={generatePropertyArea,convertRopaniAanaToArea}

