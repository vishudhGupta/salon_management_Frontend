export class ApiConstants {
  //Exam for set the api end point to hit the backend
  //This is the base url for the api
  public static baseUrl: string = 'http://127.0.0.1:8000/api';
    public static login: string = ApiConstants.baseUrl + '/users/users/login';
    public static user_dashboard: string = ApiConstants.baseUrl + '/users/users/dashboard/{{user_id}}';
    public static admin_dashboard: string = ApiConstants.baseUrl + '/salons/salons/dashboard/{{salon_id}}'
    public static calendar: string = ApiConstants.baseUrl + '/appointments/appointments/salon/{{salon_id}}'
    public static experts: string = ApiConstants.baseUrl + '/salons/salons/{{salon_id}}/experts'
    public static createExpert: string = ApiConstants.baseUrl + '/experts/experts'
    public static updateExpert: string = ApiConstants.baseUrl + '/experts/experts/{{expert_id}}'
    public static services: string = ApiConstants.baseUrl + '/salons/salons/{{salon_id}}/services'
    public static createService: string = ApiConstants.baseUrl + '/services/services'
    public static updateService: string = ApiConstants.baseUrl + '/services/services/{{service_id}}'
    public static deleteService: string = ApiConstants.baseUrl + '/salons/salons/{{salon_id}}/services/{{service_id}}'
}
