/**
 * Service error type class
 */
export class ServiceError {
    /**
     * The name of the service that had an error occur
     * Will be displayed in the header of the error modal
     */
    serviceName: string;

    /**
     * A description of the error which occurred
     * Will be displayed in the body of the error modal
     */
    errorMessage: string;
}
