/**
 * Member Management Service API
 * MMS is application intended to register and manager members, record attendance and track contribution of each members. It also allow to schedule meetings and send notification to members of the church.
 *
 * OpenAPI spec version: 1.0.0
 * Contact: metyh2@gmail.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { AddressDTO } from './addressDTO';
import { AttendanceDTO } from './attendanceDTO';
import { MemberDTO } from './memberDTO';
import { PaymentDTO } from './paymentDTO';


export interface FamilyDTO { 
    addressDTO?: AddressDTO;
    attendanceDTOList?: Array<AttendanceDTO>;
    id?: number;
    memberDTOList?: Array<MemberDTO>;
    name?: string;
    paymentDTOList?: Array<PaymentDTO>;
}
