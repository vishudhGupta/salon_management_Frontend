export class ApiConstants {
  //Exam for set the api end point to hit the backend
  //This is the base url for the api
  public static baseUrl: string = 'http://127.0.0.1:8000/api';
    public static login: string = ApiConstants.baseUrl + '/users/users/login';
    public static user_dashboard: string = ApiConstants.baseUrl + '/users/users/dashboard/{{user_id}}';
}
