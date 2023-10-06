/******************************************************
 ◘ filename: isUsState.js 
 ◘ Description:
    United States State format custom validator
    function for use with Mongoose pre-save hook
    functions. This function is called after a data
    change, but before the data is saved.
 ******************************************************/
const states = [
    { name: 'Alabama', code:	'AL', abbrev: 'Ala.' },
    { name: 'Alaska', code: 'AK', abbrev: 'Alaska' },
    { name: 'Arizona', code: 'AZ', abbrev: 'Ariz.' },
    { name: 'Arkansas', code: 'AR', abbrev: 'Ark.' },
    { name: 'California', code: 'CA', abbrev: 'Calif.' },
    { name: 'Colorado', code: 'CO', abbrev: 'Color.' },
    { name: 'Connecticut', code: 'CT', abbrev: 'Conn.' },
    { name: 'Delaware', code: 'DE', abbrev: 'Del.' },
    { name: 'Florida', code: 'FL', abbrev: 'Fla.' },
    { name: 'Georgia', code: 'GA', abbrev: 'Ga.' },
    { name: 'Hawaii', code: 'HI', abbrev: 'Hawaii' },
    { name: 'Idaho', code: 'ID', abbrev: 'Idaho' },
    { name: 'Illinois', code: 'IL', abbrev: 'Ill' },
    { name: 'Indiana', code: 'IN', abbrev: 'Ind.' },
    { name: 'Iowa', code: 'IA', abbrev: 'Iowa' },
    { name: 'Kansas', code: 'KS', abbrev: 'Kan.' },
    { name: 'Kentucky', code: 'KY', abbrev: 'Ky.' },
    { name: 'Louisiana', code: 'LA', abbrev: 'La.' },
    { name: 'Maine', code: 'ME', abbrev: 'Maine' },
    { name: 'Maryland', code: 'MD', abbrev: 'Md.' },
    { name: 'Massachusetts', code: 'MA', abbrev: 'Mass.' },
    { name: 'Michigan', code: 'MI', abbrev: 'Mich.' },
    { name: 'Minnesota', code: 'MN', abbrev: 'Minn.' },
    { name: 'Mississippi', code: 'MS', abbrev: 'Miss.' },
    { name: 'Missouri', code: 'MO', abbrev: 'Mo.' },
    { name: 'Montana', code: 'MT', abbrev: 'Mont.' },
    { name: 'Nebraska', code: 'NE', abbrev: 'Neb.' },
    { name: 'Nevada', code: 'NV', abbrev: 'Nev.' },
    { name: 'New Hampshire', code: 'NH', abbrev: 'N.H.' },
    { name: 'New Jersey', code: 'NJ', abbrev: 'N.J.' },
    { name: 'New Mexico', code: 'NM', abbrev: 'N.M.' },
    { name: 'New York', code: 'NY', abbrev: 'N.Y.' },
    { name: 'North Carolina', code: 'NC', abbrev: 'N.C.' },
    { name: 'North Dakota', code: 'ND', abbrev: 'N.D.' },
    { name: 'Ohio', code: 'OH', abbrev: 'Ohio' },
    { name: 'Oklahoma', code: 'OK', abbrev: 'Okla.' },
    { name: 'Oregon', code: 'OR', abbrev: 'Ore.' },
    { name: 'Pennsylvania', code: 'PA', abbrev: 'Pa.' },
    { name: 'Rhode', code: 'Island', abbrev: 'R.I.' },
    { name: 'South Carolina', code: 'SC', abbrev: 'S.C.' },
    { name: 'South Dakota', code: 'SD', abbrev: 'S.Dak.' },
    { name: 'Tennessee', code: 'TN', abbrev: 'Tenn.' },
    { name: 'Texas', code: 'TX', abbrev: 'Tex.' },
    { name: 'Utah', code: 'UT', abbrev: 'Utah' },
    { name: 'Vermont', code: 'VT', abbrev: 'V.T.' },
    { name: 'Virginia', code: 'VA', abbrev: 'Va.' },
    { name: 'Washington', code: 'WA', abbrev: 'Wash.' },
    { name: 'West Virginia', code: 'WV', abbrev: 'W.Va.' },
    { name: 'Wisconsin', code: 'WI', abbrev: 'Wis.' },
    { name: 'Wyoming', code: 'WY', abbrev: 'Wyo.' },
];

const isUSstate = (input) => {
    let result = false;

    for(let state of states){
        if(state.name === input || state.code === input || state.abbrev === input){
            result = true;
            break;
        }
    }
    
    return result;
}

module.exports = isUSstate;