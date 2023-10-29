import { TVacancy } from "./types";

interface TOptions {
  baseUrl: string;
  headers: Headers;
}

interface applicantInVacancyProps {
  applicantId: number;
  vacancyId: number;
  status: string;
}

interface delApplicantInVacancyProps {
  applicantId: number;
  vacancyId: number;
}

class MainApi {
  _baseUrl: string;
  _headers: Headers;
  constructor(options: TOptions) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  // проверка ответа сервера
  _getRequestResult(res: Response) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  // КАНДИДАТЫ:

  // получить общий массив всех кандидатов
  getApplicants() {
    return fetch(`${this._baseUrl}/applicants/`, {
      method: "GET",
      headers: {
        ...this._headers,
        Authorization: `Bearer `,
      },
    }).then((res) => this._getRequestResult(res));
  }

  // получить инфо о кандидате по его айди
  getApplicant(vacancyId: number) {
    return fetch(`${this._baseUrl}/applicants/${vacancyId}/`, {
      method: "GET",
      headers: {
        ...this._headers,
        Authorization: `Bearer `,
      },
    }).then((res) => this._getRequestResult(res));
  }

  // ВАКАНСИИ:

  // получить массив вакансий компании
  getVacancies() {
    return fetch(`${this._baseUrl}/vacancies/`, {
      method: "GET",
      headers: {
        ...this._headers,
        Authorization: `Bearer `,
      },
    }).then((res) => this._getRequestResult(res));
  }

  // получить данные вакансии по ее айди
  getVacancy(vacancyId: number) {
    return fetch(`${this._baseUrl}/vacancies/${vacancyId}/`, {
      method: "GET",
      headers: {
        ...this._headers,
        Authorization: `Bearer `,
      },
    }).then((res) => this._getRequestResult(res));
  }

  // добавить вакансию
  addVacancy(vacancy: TVacancy) {
    console.log(
      JSON.stringify({
        data: { created: vacancy.created?.toDateString(), ...vacancy },
      })
    );
    // return fetch(`${this._baseUrl}/vacancies/`, {
    //   method: "POST",
    //   headers: {
    //     ...this._headers,
    //     Authorization: `Bearer `,
    //     body: JSON.stringify({
    //       data: vacancy,
    //     }),
    //   },
    // }).then((res) => this._getRequestResult(res));
  }

  // редактировать вакансию
  partlyEditVacancy(vacancy: TVacancy) {
    return fetch(`${this._baseUrl}/vacancies/${vacancy.author}/`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        Authorization: `Bearer `,
        body: JSON.stringify({
          data: vacancy,
        }),
      },
    }).then((res) => this._getRequestResult(res));
  }

  // удалить вакансию
  deleteVacancy(vacancyId: number) {
    return fetch(`${this._baseUrl}/vacancies/${vacancyId}/applicants`, {
      method: "DELETE",
      headers: {
        ...this._headers,
        Authorization: `Bearer `,
      },
    }).then((res) => this._getRequestResult(res));
  }

  // ОТКЛИКИ

  // получить массив соискателей, добавленных в вакансию
  getVacancysApplicants(vacancyId: number | undefined) {
    return fetch(`${this._baseUrl}/vacancies/${vacancyId}/responses/`, {
      method: "GET",
      headers: {
        ...this._headers,
      },
    }).then((res) => this._getRequestResult(res));
  }

  // добавить соискателя в вакансию

  addApplicantToVacancy({
    applicantId,
    vacancyId,
    status,
  }: applicantInVacancyProps) {
    return fetch(`${this._baseUrl}/vacancies/${vacancyId}/responses/`, {
      method: "POST",
      headers: {
        ...this._headers,
      },
      body: JSON.stringify({
        applicant: applicantId,
        vacancy: vacancyId,
        status: status,
      }),
    }).then((res) => this._getRequestResult(res));
  }

  // получить статус соискателя в вакансии

  getApplicantStatus({ applicantId, vacancyId }: delApplicantInVacancyProps) {
    return fetch(
      `${this._baseUrl}/vacancies/${vacancyId}/responses/${applicantId}`,
      {
        method: "GET",
        headers: {
          ...this._headers,
        },
      }
    ).then((res) => this._getRequestResult(res));
  }

  // обновить статус соискателя в вакансии

  updateApplicantStatus({
    applicantId,
    vacancyId,
    status,
  }: applicantInVacancyProps) {
    return fetch(
      `${this._baseUrl}/vacancies/${vacancyId}/responses/${applicantId}/`,
      {
        method: "PUT",
        headers: {
          ...this._headers,
        },
        body: JSON.stringify({
          applicant: applicantId,
          vacancy: vacancyId,
          status: status,
        }),
      }
    ).then((res) => this._getRequestResult(res));
  }

  // удаляет соискателя из вакансии

  deleteApplicantFromVacancy({
    applicantId,
    vacancyId,
  }: delApplicantInVacancyProps) {
    return fetch(
      `${this._baseUrl}/vacancies/${vacancyId}/responses/${applicantId}`,
      {
        method: "DELETE",
        headers: {
          ...this._headers,
        },
      }
    ).then((res) => this._getRequestResult(res));
  }

  getCityById(cityId: number) {
    return fetch(`${this._baseUrl}/cities/${cityId}/`, {
      method: "GET",
      headers: {
        ...this._headers,
        Authorization: `Bearer `,
      },
    }).then((res) => this._getRequestResult(res));
  }

  getCities() {
    return fetch(`${this._baseUrl}/cities/`, {
      method: "GET",
      headers: {
        ...this._headers,
        Authorization: `Bearer `,
      },
    }).then((res) => this._getRequestResult(res));
  }
}

// инициализация headers
const requestHeaders: HeadersInit = new Headers();
requestHeaders.set("Content-Type", "application/json");

// Создание экземпляра класса Api
const mainApi = new MainApi({
  baseUrl: "http://130.193.38.180/api",
  headers: requestHeaders,
});

export default mainApi;
