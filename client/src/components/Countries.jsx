import React from 'react';
import '../App.css';

const abb = ["AF", "AL", "DZ", "AX", "AS", "AI", "AD", "AO", "AN", "AG", "AQ", "AR", "AM", "AU", "AT", "AW", "AZ",
"BA", "BB", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BM", "BN", "BO", "BR", "BS", "BT", "BV", "BW", "BY", "BZ", "KH",
"CM", "CA", "CV", "CF", "TD", "CL", "CN", "CX", "CC", "CO", "CG", "CI", "CK", "CR", "HR", "CU", "CY", "CZ", "CD", "DJ",
"DK", "DM", "DO", "EC", "EG", "SV", "TP", "EE", "GQ", "ER", "ET", "FI", "FJ", "FK", "FM", "FO", "FR", "FX", "GF", "PF",
"GA", "GM", "DE", "GH", "GI", "GB", "GD", "GE", "GR", "GL", "GN", "GP", "GS", "GT", "GU", "GW", "GY", "HK", "HM", "HN",
"HT", "HU", "ID", "IE", "IL", "IN", "IO", "IQ", "IR", "IT", "JM", "JO", "JP", "KE", "KG", "KI", "KM", "KN", "KP", "KR",
"KW", "KY", "KZ", "LA", "LB", "LC", "LI", "LK", "LR", "LS", "LT", "LU", "LV", "LY", "MK", "MO", "MG", "MY", "ML", "MW",
"MR", "MH", "MQ", "MU", "YT", "MT", "MX", "MA", "MC", "MD", "MN", "MM", "MP", "MS", "MV", "MZ", "NA", "NC", "NE", "NF",
"NG", "NI", "NL", "NO", "NP", "NR", "NU", "NZ", "OM", "PA", "PE", "PG", "PH", "PK", "PL", "PM", "CS", "PN", "PR", "PS",
"PT", "PW", "PY", "QA", "RE", "RO", "RU", "RW", "SA", "WS", "SH", "VC", "SM", "ST", "SN", "SC", "SL", "SG", "SK", "SI",
"SB", "SO", "ZA", "ES", "SD", "SR", "SJ", "SE", "CH", "SY", "SU", "SZ", "TW", "TZ", "TJ", "TH", "TL", "TG", "TK", "TO",
"TT", "TN", "TR", "TM", "TC", "TV", "UA", "UG", "AE", "UK", "US", "UM", "UY", "UZ", "VU", "VA", "VE", "VG", "VI", "VN",
"WF", "EH", "YE", "YU", "ZM", "ZR", "ZW"];

const country = ["Afghanistan", "Albania", "Algeria", "Aland Islands", "American Samoa", "Anguilla", "Andorra", "Angola",
"Antilles - Netherlands", "Antigua and Barbuda", "Antarctica", "Argentina", "Armenia", "Australia", "Austria", "Aruba", "Azerbaijan",
"Bosnia and Herzegovina", "Barbados", "Bangladesh", "Belgium", "Burkina Faso", "Bulgaria", "Bahrain", "Burundi", "Benin", "Bermuda",
"Brunei Darussalam", "Bolivia", "Brazil", "Bahamas", "Bhutan", "Bouvet Island", "Botswana", "Belarus", "Belize", "Cambodia", "Cameroon",
"Canada", "Cape Verde", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia",
"Congo", "Cote D'Ivoire (Ivory Coast)", "Cook Islands", "Costa Rica", "Croatia (Hrvatska)", "Cuba", "Cyprus", "Czech Republic",
"Democratic Republic of the Congo", "Djibouti", "Denmark", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "East Timor",
"Estonia", "Equatorial Guinea", "Eritrea", "Ethiopia", "Finland", "Fiji", "Falkland Islands (Malvinas)", "Federated States of Micronesia",
"Faroe Islands", "France", "France, Metropolitan", "French Guiana", "French Polynesia", "Gabon", "Gambia", "Germany", "Ghana", "Gibraltar",
"Great Britain (UK)", "Grenada", "Georgia", "Greece", "Greenland", "Guinea", "Guadeloupe", "S. Georgia and S. Sandwich Islands", "Guatemala",
"Guam", "Guinea-Bissau", "Guyana", "Hong Kong", "Heard Island and McDonald Islands", "Honduras", "Haiti", "Hungary", "Indonesia", "Ireland",
"Israel", "India", "British Indian Ocean Territory", "Iraq", "Iran", "Italy", "Jamaica", "Jordan", "Japan", "Kenya", "Kyrgyzstan", "Kiribati",
"Comoros", "Saint Kitts and Nevis", "Korea (North)", "Korea (South)", "Kuwait", "Cayman Islands", "Kazakhstan", "Laos", "Lebanon", "Saint Lucia",
"Liechtenstein", "Sri Lanka", "Liberia", "Lesotho", "Lithuania", "Luxembourg", "Latvia", "Libya", "Macedonia", "Macao", "Madagascar", "Malaysia",
"Mali", "Malawi", "Mauritania", "Marshall Islands", "Martinique", "Mauritius", "Mayotte", "Malta", "Mexico", "Morocco", "Monaco", "Moldova",
"Mongolia", "Myanmar", "Northern Mariana Islands", "Montserrat", "Maldives", "Mozambique", "Namibia", "New Caledonia", "Niger", "Norfolk Island",
"Nigeria", "Nicaragua", "Netherlands", "Norway", "Nepal", "Nauru", "Niue", "New Zealand (Aotearoa)", "Oman", "Panama", "Peru", "Papua New Guinea",
"Philippines", "Pakistan", "Poland", "Saint Pierre and Miquelon", "Serbia and Montenegro", "Pitcairn", "Puerto Rico", "Palestinian Territory",
"Portugal", "Palau", "Paraguay", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saudi Arabia", "Samoa", "Saint Helena",
"Saint Vincent and the Grenadines", "San Marino", "Sao Tome and Principe", "Senegal", "Seychelles", "Sierra Leone", "Singapore", "Slovakia",
"Slovenia", "Solomon Islands", "Somalia", "South Africa", "Spain", "Sudan", "Suriname", "Svalbard and Jan Mayen", "Sweden", "Switzerland", "Syria",
"USSR (former)", "Swaziland", "Taiwan", "Tanzania", "Tajikistan", "Thailand", "Timor-Leste", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago",
"Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Ukraine", "Uganda", "United Arab Emirates", "United Kingdom", "United States",
"United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City State", "Venezuela", "Virgin Islands (British)", "Virgin Islands (U.S.)",
"Viet Nam", "Wallis and Futuna", "Western Sahara", "Yemen", "Yugoslavia (former)", "Zambia", "Zaire (former)", "Zimbabwe"];

const makeSelectCountry = () => {
    return abb.map((abb, index) => <option value={abb} key = {abb}>{country[index]}</option>)
}

const warnStyle = {
    border: '1px solid red'
}

const Countries = (props) => {

    return (
        <div>
            <select name="country" id="country" value={props.country} onChange={props.onChange}
                style={(!props.country && props.saveAttempt===true)  ? warnStyle : null}>
                <option value="">Država</option>
                {makeSelectCountry()}
            </select>
            <select name="nationality" id="nationality" value={props.nationality} onChange={props.onChange}
                style={(!props.nationality && props.saveAttempt===true)  ? warnStyle : null}>
                <option value="">Državljanstvo</option>
                {makeSelectCountry()}
            </select>
        </div>
    )
}

export default Countries;