import { beforeEach, describe, expect, it, vi } from "vitest";
import { ICreateClientOpts } from "matrix-js-sdk";
import {
    MatrixClientWrapperInterface,
    MatrixLocalUserStore,
    MatrixClientWrapper,
    DEFAULT_CHAT_DISPLAY_NAME,
} from "../MatrixClientWrapper";

// @vitest-environment jsdom
vi.mock("../AccessSecretStorageDialog.svelte", () => {
    return {};
});

vi.mock("../CreateRecoveryKeyDialog.svelte", () => {
    return {};
});
vi.mock("../InteractiveAuthDialog.svelte", () => {
    return {};
});

describe("MatrixClientWrapper", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    describe("initMatrixClient", () => {
        const basicMockClient = {
            login: () => {
                return Promise.resolve({
                    user_id: null,
                    access_token: null,
                    refresh_token: null,
                    device_id: null,
                });
            },
            registerGuest: () => {
                return Promise.resolve({
                    access_token: null,
                    refresh_token: null,
                    user_id: null,
                    device_id: null,
                });
            },
            setGuest: vi.fn(),
            clearStores: vi.fn(),
            getUser: vi.fn().mockReturnValue({
                displayName: null,
            }),
            setDisplayName: vi.fn(),
        };

        const basicLocalUserStoreMock: MatrixLocalUserStore = {
            getLocalUser: vi.fn().mockReturnValue(null),
            getMatrixDeviceId: vi.fn().mockReturnValue(null),
            getMatrixAccessToken: vi.fn().mockReturnValue(null),
            getMatrixRefreshToken: vi.fn().mockReturnValue(null),
            getMatrixUserId: vi.fn().mockReturnValue(null),
            getMatrixLoginToken: vi.fn().mockReturnValue(null),
            setMatrixDeviceId: vi.fn().mockReturnValue(null),
            setMatrixLoginToken: vi.fn(),
            setMatrixUserId: vi.fn().mockReturnValue(null),
            setMatrixAccessToken: vi.fn(),
            setMatrixRefreshToken: vi.fn(),
            setMatrixAccessTokenExpireDate: vi.fn(),
            getName: vi.fn().mockReturnValue(null),
            setGuest: vi.fn(),
            isGuest: vi.fn().mockReturnValue(null),
        } as unknown as MatrixLocalUserStore;

        it("should throw a error when localUserStore uuid is undefined or null", async () => {
            const createClient = vi.fn().mockReturnValue(basicMockClient);

            const matrixBaseURL = "baseUrl";

            const matrixClientWrapperInstance: MatrixClientWrapperInterface = new MatrixClientWrapper(
                matrixBaseURL,
                basicLocalUserStoreMock,
                createClient
            );

            // eslint-disable-next-line
            await expect(matrixClientWrapperInstance.initMatrixClient()).rejects.toThrow();
        });
        it("should throw a error when registerGuest throw a error", async () => {
            const createClient = vi.fn().mockReturnValue(basicMockClient);

            const matrixBaseURL = "testUrl";

            const localUserStoreMock: MatrixLocalUserStore = {
                ...basicLocalUserStoreMock,
                getLocalUser: vi.fn().mockReturnValue({
                    uuid: "myUuid",
                    email: "",
                    isMatrixRegistered: false,
                    matrixUserId: "",
                }),
                getName: function (): string {
                    throw new Error("getName not implemented.");
                },
            } as unknown as MatrixLocalUserStore;

            const matrixClientWrapperInstance: MatrixClientWrapperInterface = new MatrixClientWrapper(
                matrixBaseURL,
                localUserStoreMock,
                createClient
            );
            // eslint-disable-next-line
            await expect(matrixClientWrapperInstance.initMatrixClient()).rejects.toThrow(
                "Unable to establish a Matrix Guest connection"
            );
        });
        it("should throw a error when matrix access token is null", async () => {
            const createClient = vi.fn().mockReturnValue(basicMockClient);

            const matrixBaseURL = "testUrl";

            const localUserStoreMock: MatrixLocalUserStore = {
                ...basicLocalUserStoreMock,
                getLocalUser: vi.fn().mockReturnValue({
                    uuid: "myUuid",
                    email: "",
                    isMatrixRegistered: false,
                    matrixUserId: "",
                }),
                getMatrixAccessToken: vi.fn().mockReturnValue(null),
            } as unknown as MatrixLocalUserStore;

            const matrixClientWrapperInstance: MatrixClientWrapperInterface = new MatrixClientWrapper(
                matrixBaseURL,
                localUserStoreMock,
                createClient
            );
            // eslint-disable-next-line
            await expect(matrixClientWrapperInstance.initMatrixClient()).rejects.toThrow(
                "Unable to connect to matrix, access token is null"
            );
        });
        it("should throw a error when matrixUserId is null", async () => {
            const createClient = vi.fn().mockReturnValue(basicMockClient);

            const matrixBaseURL = "testUrl";

            const localUserStoreMock: MatrixLocalUserStore = {
                ...basicLocalUserStoreMock,
                getLocalUser: vi.fn().mockReturnValue({
                    uuid: "myUuid",
                    email: "",
                    isMatrixRegistered: false,
                    matrixUserId: "",
                }),
                getMatrixAccessToken: vi.fn().mockReturnValue("accessToken"),
                getMatrixUserId: vi.fn().mockReturnValue(null),
            } as unknown as MatrixLocalUserStore;

            const matrixClientWrapperInstance: MatrixClientWrapperInterface = new MatrixClientWrapper(
                matrixBaseURL,
                localUserStoreMock,
                createClient
            );

            // matrixClientWrapperInstance.initMatrixClient()
            await expect(matrixClientWrapperInstance.initMatrixClient()).rejects.toThrow(
                "Unable to connect to matrix, matrixUserId is null"
            );
        });
        it("should throw a error when matrixDeviceId is null", async () => {
            const createClient = vi.fn().mockReturnValue(basicMockClient);

            const matrixBaseURL = "testUrl";

            const localUserStoreMock: MatrixLocalUserStore = {
                ...basicLocalUserStoreMock,
                getLocalUser: vi.fn().mockReturnValue({
                    uuid: "myUuid",
                    email: "",
                    isMatrixRegistered: false,
                    matrixUserId: "",
                }),
                getMatrixAccessToken: vi.fn().mockReturnValue("accessToken"),
                getMatrixUserId: vi.fn().mockReturnValue("matrixUserId"),
                setMatrixDeviceId: vi.fn().mockReturnValue(null),
            } as unknown as MatrixLocalUserStore;

            const matrixClientWrapperInstance: MatrixClientWrapperInterface = new MatrixClientWrapper(
                matrixBaseURL,
                localUserStoreMock,
                createClient
            );

            // matrixClientWrapperInstance.initMatrixClient()
            await expect(matrixClientWrapperInstance.initMatrixClient()).rejects.toThrow(
                "Unable to connect to matrix, matrixDeviceId is null"
            );
        });
        it("should call clearStore when oldMatrixId !== newMatrixId", async () => {
            //oldFromLocalStorage
            //newFrom login token or guestAccess
            const spyClearStore = vi.fn();

            const mockClient = {
                ...basicMockClient,
                login: () => {
                    return Promise.resolve({
                        user_id: "matrixIdFromLogin",
                        access_token: null,
                        refresh_token: null,
                        expires_in_ms: "",
                    });
                },
                registerGuest: () => {
                    return Promise.resolve({
                        access_token: "accessToken",
                        refresh_token: null,
                        user_id: "matrixIdFromRegisterGuest",
                        device_id: "deviceID-guest",
                    });
                },
                clearStores: spyClearStore,
            };

            const createClient = vi.fn().mockReturnValue(mockClient);

            const matrixBaseURL = "testUrl";

            const localUserStoreMock: MatrixLocalUserStore = {
                ...basicLocalUserStoreMock,
                getLocalUser: vi.fn().mockReturnValue({
                    uuid: "myUuid",
                    email: "",
                    isMatrixRegistered: false,
                    matrixUserId: "matrixIdFromLocalUser",
                }),
                getMatrixDeviceId: vi.fn().mockReturnValue("deviceID"),
            } as unknown as MatrixLocalUserStore;

            // eslint-disable-next-line
            vi.spyOn(MatrixClientWrapper.prototype as any, "matrixWebClientStore").mockReturnValue({});

            const matrixClientWrapperInstance: MatrixClientWrapperInterface = new MatrixClientWrapper(
                matrixBaseURL,
                localUserStoreMock,
                createClient
            );

            await matrixClientWrapperInstance.initMatrixClient();
            expect(spyClearStore).toHaveBeenCalledOnce();
        });
        it("should call final create client with user Information when user have a matrix account", async () => {
            const userId = "Alice";
            const accessToken = "accessToken";
            const refreshToken = "refreshToken";
            const deviceId = "deviceId";
            const matrixBaseURL = "testUrl";

            const mockClient = {
                ...basicMockClient,
                login: () => {
                    return Promise.resolve({
                        user_id: userId,
                        access_token: accessToken,
                        refresh_token: refreshToken,
                        device_id: deviceId,
                    });
                },
            };

            const createClient = vi.fn().mockReturnValue(mockClient);

            const localUserStoreMock: MatrixLocalUserStore = {
                ...basicLocalUserStoreMock,
                getLocalUser: vi.fn().mockReturnValue({
                    uuid: "myUuid",
                    email: "",
                    isMatrixRegistered: false,
                    matrixUserId: "",
                }),
                getMatrixAccessToken: vi.fn().mockReturnValue("AccessToken"),
                getMatrixRefreshToken: vi.fn().mockReturnValue("RefreshToken"),
                getMatrixUserId: vi.fn().mockReturnValue("UserId"),
                getMatrixLoginToken: vi.fn().mockReturnValue("LoginToken"),
                isGuest: vi.fn().mockReturnValue(false),
            } as unknown as MatrixLocalUserStore;
            const matrixClientWrapperInstance: MatrixClientWrapperInterface = new MatrixClientWrapper(
                matrixBaseURL,
                localUserStoreMock,
                createClient
            );

            await matrixClientWrapperInstance.initMatrixClient();

            // eslint-disable-next-line
            expect(localUserStoreMock.setMatrixLoginToken).toHaveBeenCalledOnce();
            // eslint-disable-next-line
            expect(localUserStoreMock.setMatrixLoginToken).toHaveBeenCalledWith(null);

            // eslint-disable-next-line
            expect(localUserStoreMock.setGuest).toHaveBeenCalledOnce();
            // eslint-disable-next-line
            expect(localUserStoreMock.setGuest).toHaveBeenCalledWith(false);

            expect(createClient).toHaveBeenCalledTimes(2);

            const lastCreateClientArg: ICreateClientOpts = createClient.mock.calls[1][0] as ICreateClientOpts;

            expect(lastCreateClientArg.baseUrl).toBe(matrixBaseURL);
            expect(lastCreateClientArg.deviceId).toBe(deviceId);
            expect(lastCreateClientArg.userId).toBe(userId);
            expect(lastCreateClientArg.accessToken).toBe(accessToken);
            expect(lastCreateClientArg.refreshToken).toBe(refreshToken);
        });
        it("should call final create client with new guest account Information when user have not a matrix account", async () => {
            const userId = "Alice";
            const accessToken = "guestAccessToken";
            const refreshToken = "guestRefreshToken";
            const deviceId = "guestDeviceId";
            const matrixBaseURL = "testUrl";

            const mockClient = {
                ...basicMockClient,
                registerGuest: () => {
                    return Promise.resolve({
                        access_token: accessToken,
                        refresh_token: refreshToken,
                        user_id: userId,
                        device_id: deviceId,
                    });
                },
            };

            const createClient = vi.fn().mockReturnValue(mockClient);

            const localUserStoreMock: MatrixLocalUserStore = {
                ...basicLocalUserStoreMock,
                getLocalUser: vi.fn().mockReturnValue({
                    uuid: "myUuid",
                    email: "",
                    isMatrixRegistered: false,
                    matrixUserId: "",
                }),
                isGuest: vi.fn().mockReturnValue(false),
            } as unknown as MatrixLocalUserStore;

            const matrixClientWrapperInstance: MatrixClientWrapperInterface = new MatrixClientWrapper(
                matrixBaseURL,
                localUserStoreMock,
                createClient
            );

            await matrixClientWrapperInstance.initMatrixClient();

            // eslint-disable-next-line
            expect(localUserStoreMock.setMatrixLoginToken).not.toHaveBeenCalled();

            // eslint-disable-next-line
            expect(localUserStoreMock.setGuest).toHaveBeenCalledOnce();
            // eslint-disable-next-line
            expect(localUserStoreMock.setGuest).toHaveBeenCalledWith(true);

            expect(createClient).toHaveBeenCalledTimes(2);

            const lastCreateClientArg: ICreateClientOpts = createClient.mock.calls[1][0] as ICreateClientOpts;

            expect(lastCreateClientArg.baseUrl).toBe(matrixBaseURL);
            expect(lastCreateClientArg.deviceId).toBe(deviceId);
            expect(lastCreateClientArg.userId).toBe(userId);
            expect(lastCreateClientArg.accessToken).toBe(accessToken);
            expect(lastCreateClientArg.refreshToken).toBe(refreshToken);
        });
        it("should call create client with 2 crypto callback", async () => {
            const userId = "Alice";
            const accessToken = "accessToken";
            const refreshToken = "refreshToken";
            const deviceId = "deviceId";
            const matrixBaseURL = "testUrl";

            const mockClient = {
                ...basicMockClient,
                login: () => {
                    return Promise.resolve({
                        user_id: userId,
                        access_token: accessToken,
                        refresh_token: refreshToken,
                        device_id: deviceId,
                    });
                },
            };

            const createClient = vi.fn().mockReturnValue(mockClient);

            const localUserStoreMock: MatrixLocalUserStore = {
                ...basicLocalUserStoreMock,
                getLocalUser: vi.fn().mockReturnValue({
                    uuid: "myUuid",
                    email: "",
                    isMatrixRegistered: false,
                    matrixUserId: "",
                }),
                getMatrixAccessToken: vi.fn().mockReturnValue("accessToken"),
                getMatrixRefreshToken: vi.fn().mockReturnValue("refreshToken"),
                getMatrixUserId: vi.fn().mockReturnValue("userId"),
                getMatrixLoginToken: vi.fn().mockReturnValue("loginToken"),
                isGuest: vi.fn().mockReturnValue(false),
            } as unknown as MatrixLocalUserStore;
            const matrixClientWrapperInstance: MatrixClientWrapperInterface = new MatrixClientWrapper(
                matrixBaseURL,
                localUserStoreMock,
                createClient
            );

            await matrixClientWrapperInstance.initMatrixClient();

            const lastCreateClientArg: ICreateClientOpts = createClient.mock.calls[1][0] as ICreateClientOpts;

            expect(lastCreateClientArg.cryptoCallbacks?.getSecretStorageKey).toBeDefined();
            expect(lastCreateClientArg.cryptoCallbacks?.cacheSecretStorageKey).toBeDefined();
        });
        it("should use localStorage name as display name when name is not null and user is log as guest ", async () => {
            const userId = "Alice";
            const accessToken = "guestAccessToken";
            const refreshToken = "guestRefreshToken";
            const deviceId = "guestDeviceId";
            const matrixBaseURL = "testUrl";

            const mockClient = {
                ...basicMockClient,
                registerGuest: () => {
                    return Promise.resolve({
                        access_token: accessToken,
                        refresh_token: refreshToken,
                        user_id: userId,
                        device_id: deviceId,
                    });
                },
                getUser: vi.fn().mockReturnValue({
                    displayName: "DisplayName",
                }),
            };

            const createClient = vi.fn().mockReturnValue(mockClient);

            const localUserStoreMock: MatrixLocalUserStore = {
                ...basicLocalUserStoreMock,
                getLocalUser: vi.fn().mockReturnValue({
                    uuid: "myUuid",
                    email: "",
                    isMatrixRegistered: false,
                    matrixUserId: "",
                }),
                setMatrixDeviceId: vi.fn().mockReturnValue(""),
                setMatrixUserId: vi.fn().mockReturnValue(""),
                getName: vi.fn().mockReturnValue(userId),
                isGuest: vi.fn().mockReturnValue(true),
            } as unknown as MatrixLocalUserStore;

            const matrixClientWrapperInstance: MatrixClientWrapperInterface = new MatrixClientWrapper(
                matrixBaseURL,
                localUserStoreMock,
                createClient
            );

            await matrixClientWrapperInstance.initMatrixClient();

            expect(mockClient.setDisplayName).toHaveBeenCalledOnce();
            expect(mockClient.setDisplayName).toHaveBeenCalledWith(userId);
        });
        it("should use default name as display name when name is null", async () => {
            const userId = "defaultMatrixName";
            const accessToken = "guestAccessToken";
            const refreshToken = "guestRefreshToken";
            const deviceId = "guestDeviceId";
            const matrixBaseURL = "testUrl";

            const mockClient = {
                ...basicMockClient,
                registerGuest: () => {
                    return Promise.resolve({
                        access_token: accessToken,
                        refresh_token: refreshToken,
                        user_id: userId,
                        device_id: deviceId,
                    });
                },
                getUser: vi.fn().mockReturnValue({
                    displayName: userId,
                }),
            };

            const createClient = vi.fn().mockReturnValue(mockClient);

            const localUserStoreMock: MatrixLocalUserStore = {
                ...basicLocalUserStoreMock,
                getLocalUser: vi.fn().mockReturnValue({
                    uuid: "myUuid",
                    email: "",
                    isMatrixRegistered: false,
                    matrixUserId: "",
                }),
                setMatrixDeviceId: vi.fn().mockReturnValue(""),
                setMatrixUserId: vi.fn().mockReturnValue(""),
                getName: vi.fn().mockReturnValue(null),
                isGuest: vi.fn().mockReturnValue(true),
            } as unknown as MatrixLocalUserStore;

            const matrixClientWrapperInstance: MatrixClientWrapperInterface = new MatrixClientWrapper(
                matrixBaseURL,
                localUserStoreMock,
                createClient
            );

            await matrixClientWrapperInstance.initMatrixClient();

            expect(mockClient.setDisplayName).toHaveBeenCalledOnce();
            expect(mockClient.setDisplayName).toHaveBeenCalledWith(DEFAULT_CHAT_DISPLAY_NAME);
        });
    });
});