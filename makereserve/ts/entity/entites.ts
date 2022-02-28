export interface Entity {

};

export interface Children extends Entity {
    child_id: number;
    user_id: string;
    name: string;
    kana: string;
    birthday: string;
    regist_age: number;
    gender: number;
    blood_type: string;
    allergy_flag: number;
    allergy_causes1: number;
    allergy_symptoms1: number;
    allergy_treatments1: number;
    allergy_concerns1: number;
    allergy_causes2: number;
    allergy_symptoms2: number;
    allergy_treatments2: number;
    allergy_concerns2: number;
    allergy_causes3: number;
    allergy_symptoms3: number;
    allergy_treatments3: number;
    allergy_concerns3: number;
    brothers_sisters_flag: number;
    multiple_births_flag: number;
    disabilities: number;
    childcare_business_user_flag: number;
    no_childcare_provided_flag: number;
    limit_approval_flag: number;
    delete_flag: number;
    create_user: string;
    create_datetime: string;
    update_user: string;
    update_datetime: string;
};
  
export interface UseReservation {
    reservation_no: number;
    facility_id: string;
    user_id: string;
    child_id: number;
    usage_date: string;
    use_from_datetime: string;
    use_to_datetime: string;
    way_to_reserve: number;
    accept_date: string;
    status: number;
    achieve_flag: number;
    amount: string;
    citizen_note: string;
    facility_note: string;
    cancel_reason_category: number;
    cancel_note: string;
    use_reason_category: number;
    create_user: string;
    create_datetime: string;
    update_user: string;
    update_datetime: string;
};

export let basicReservedUseReservationEntity: UseReservation = {
    reservation_no: 834,
    facility_id: 'a00021',
    user_id: 'a07ae029-5bd3-4471-8241-861077402822',
    child_id: 1,
    usage_date: '2022-02-28',
    use_from_datetime: '2022-02-28 09:00:00',
    use_to_datetime: '2022-02-28 18:00:00',
    way_to_reserve: 1,
    accept_date: '2022-02-26',
    status: 1,
    achieve_flag: 0,
    amount: 'NULL',
    citizen_note: 'NULL',
    facility_note: 'NULL',
    cancel_reason_category: 1,
    cancel_note: 'NULL',
    use_reason_category: 1,
    create_user: 'b7fa9726-57b9-41b4-9b6c-f21d7b84ed36',
    create_datetime: '2022-02-26 02:11:20.990',
    update_user: 'b7fa9726-57b9-41b4-9b6c-f21d7b84ed36',
    update_datetime: '2022-02-26 02:11:20.990',
};
export let basicUsedUseReservationEntity: UseReservation = {
    reservation_no: 835,
    facility_id: 'a00021',
    user_id: 'c033a391-02fa-4373-bcd1-1ad455aabe17',
    child_id: 3,
    usage_date: '2022-02-28',
    use_from_datetime: '2022-02-28 09:00:00',
    use_to_datetime: '2022-02-28 18:00:00',
    way_to_reserve: 1,
    accept_date: '2022-02-26',
    status: 2,
    achieve_flag: 1,
    amount: 'NULL',
    citizen_note: 'NULL',
    facility_note: 'NULL',
    cancel_reason_category: 1,
    cancel_note: 'NULL',
    use_reason_category: 1,
    create_user: 'b7fa9726-57b9-41b4-9b6c-f21d7b84ed36',
    create_datetime: '2022-02-26 02:12:42.646',
    update_user: 'b7fa9726-57b9-41b4-9b6c-f21d7b84ed36',
    update_datetime: '2022-02-26 02:13:27.249',
};
export let basicRequestUseReservationEntity: UseReservation = {
    reservation_no: 836,
    facility_id: 'a00021',
    user_id: 'eca71727-d95c-42fe-890d-f5a2223b413f',
    child_id: 1,
    usage_date: '2022-02-28',
    use_from_datetime: '2022-02-28 09:00:00',
    use_to_datetime: '2022-02-28 18:00:00',
    way_to_reserve: 1,
    accept_date: '2022-02-26',
    status: 0,
    achieve_flag: 0,
    amount: 'NULL',
    citizen_note: 'NULL',
    facility_note: 'NULL',
    cancel_reason_category: 1,
    cancel_note: 'NULL',
    use_reason_category: 1,
    create_user: 'b7fa9726-57b9-41b4-9b6c-f21d7b84ed36',
    create_datetime: '2022-02-26 02:15:43.092',
    update_user: 'b7fa9726-57b9-41b4-9b6c-f21d7b84ed36',
    update_datetime: '2022-02-26 02:15:43.092',
};

export interface UsageRecord {
    reservation_no: number;
    facility_id: string;
    user_id: string;
    child_id: number;
    usage_date: string;
    use_from_datetime: string;
    use_to_datetime: string;
    way_to_reserve: number;
    accept_date: string;
    status: number;
    report_status: number;
    usage_fee_per_day_upper3: number;
    usage_fee_per_day_under3: number;
    usage_fee_per_hour_upper3: number;
    usage_fee_per_hour_under3: number;
    extention_fee_per_hour_upper3: number;
    extention_fee_per_hour_under3: number;
    nightly_fee_per_hour_upper3: number;
    nightly_fee_per_hour_under3: number;
    lunch_fee: number;
    snack_fee: number;
    amount: number;
    use_reason_category: number;
    lunch_count: number;
    snack_count: number;
    create_user: string;
    create_datetime: string;
    update_user: string;
    update_datetime: string;
};

export let basicUsageRecordEntity: UsageRecord = {
    reservation_no: 35,
    facility_id: 'a00021',
    user_id: 'c033a391-02fa-4373-bcd1-1ad455aabe17',
    child_id: 3,
    usage_date: '2022-02-28',
    use_from_datetime: '2022-02-28 09:00:00',
    use_to_datetime: '2022-02-28 18:00:00',
    way_to_reserve: 1,
    accept_date: '2022-02-26',
    status: 1,
    report_status: 1,
    usage_fee_per_day_upper3: 0,
    usage_fee_per_day_under3: 0,
    usage_fee_per_hour_upper3: 0,
    usage_fee_per_hour_under3: 0,
    extention_fee_per_hour_upper3: 0,
    extention_fee_per_hour_under3: 0,
    nightly_fee_per_hour_upper3: 0,
    nightly_fee_per_hour_under3: 0,
    lunch_fee: 300,
    snack_fee: 100,
    amount: 4600,
    use_reason_category: 1,
    lunch_count: 0,
    snack_count: 0,
    create_user: 'b7fa9726-57b9-41b4-9b6c-f21d7b84ed36',
    create_datetime: '2022-02-26 02:13:27.215',
    update_user: 'b7fa9726-57b9-41b4-9b6c-f21d7b84ed36',
    update_datetime: '2022-02-26 02:13:27.215',
};

  