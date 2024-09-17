import { useParams } from 'react-router'

export function EmployeeDetails() {
    const { employeeId } = useParams()

    return (
        <section className="details-page flex column center">
            <button className='back-btn'>
                <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#ffffff" stroke="none"><path d="M3515 5100 c-44 -18 -189 -159 -1228 -1197 -952 -951 -1184 -1188 -1203 -1228 -18 -37 -24 -67 -24 -115 0 -132 -74 -50 1223 -1346 1123 -1123 1174 -1173 1230 -1193 73 -27 131 -27 204 1 48 17 77 40 174 137 144 143 163 177 164 286 0 58 -5 91 -19 120 -13 27 -333 355 -995 1018 l-976 977 977 978 c537 537 984 993 994 1012 9 19 19 67 22 106 7 110 -20 160 -166 305 -98 97 -127 119 -175 137 -71 27 -136 27 -202 2z" /></g></svg>
            </button>
            <div>
                <h1>{employeeId}</h1>
            </div>
        </section>
    )
}