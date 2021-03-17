
exports.transfromData = async (req, res, next) => {
    try {
        const {payload,referenceData} = req.body;
        const newpayload = replacePayloadValue(payload,referenceData)
        res.status(200).json((newpayload));
    } catch (e) {
        next(e);
    }
}


function replacePayloadValue(payload, referenceData) {
    payload.value.forEach(value => {
        if (value.valueType == 'string') {
            replaceValue(value, referenceData)
        } else {
            replacePayloadValue(value, referenceData)
        }
    });
    return payload
}

function replaceValue(obj, refData) {
    if (obj.value.includes('REF')) {
        let firstStringArr = obj.value.split('{')
        let inputstrArr = firstStringArr[1].split('}')
        obj.value = refData[inputstrArr[0]] + '' + inputstrArr[1]
    }
}