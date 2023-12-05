const ElderlyController = require("../../controllers/elderlyController");
const Elderly = require("../../models/elderly");
const { validationResult } = require("express-validator");
const { DateTime } = require("luxon");

jest.mock("../../models/elderly");
beforeEach(() => {
  jest.clearAllMocks();
});

describe("Elderly Controller Tests", () => {
  it("should get one elderly successfully", async () => {
    const mockElderlyData = {
      id: "testId",
    };

    Elderly.findById.mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockElderlyData),
    });

    const req = { params: { id: "testId" } };
    const mockJson = jest.fn();
    const res = {
      status: jest.fn(() => ({ json: mockJson })),
      send: jest.fn(),
    };
    const next = jest.fn();

    await ElderlyController.get_one_elderly(req, res, next);

    expect(Elderly.findById).toHaveBeenCalledWith("testId");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(mockJson).toHaveBeenCalledWith(mockElderlyData);
    expect(next).not.toHaveBeenCalled();
  });

  it("should get a list of elderlies successfully", async () => {
    const mockElderlies = [
      {
        id: "id1",
        name: "Elderly 1",
        created_at: new Date(),
        description: "Description 1",
        status: "Regular",
        type: "Tipo 1",
        updated_at: new Date(),
      },
      {
        id: "id2",
        name: "Elderly 2",
        created_at: new Date(),
        description: "Description 2",
        status: "Irregular",
        type: "Tipo 2",
        updated_at: new Date(),
      },
    ];

    // Mock do método find para retornar um objeto com exec
    Elderly.find.mockReturnValue({
      sort: jest.fn().mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockElderlies),
      }),
    });

    const req = {};
    const mockJson = jest.fn();
    const res = {
      status: jest.fn(() => ({ json: mockJson })),
      send: jest.fn(),
    };
    const next = jest.fn();

    await ElderlyController.list_elderlies(req, res, next);

    expect(Elderly.find).toHaveBeenCalledWith(
      {},
      "created_at description name status type updated_at"
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(mockJson).toHaveBeenCalledWith(mockElderlies);
    expect(next).not.toHaveBeenCalled();
  });

  // it("should save an elderly successfully", async () => {
  //   const req = {
  //     body: {
  //       elderly: {
  //         name: "Test Elderly",
  //         created_at: new Date(),
  //         description: "Test Description",
  //         status: "Regular",
  //         type: "Tipo 1",
  //         updated_at: new Date(),
  //       },
  //     },
  //   };

  //   const res = {
  //     status: jest.fn().mockReturnThis(),
  //     json: jest.fn(),
  //   };

  //   const next = jest.fn();

  //   // Simula o comportamento do método save do Mongoose
  //   Elderly.prototype.save.mockResolvedValueOnce({
  //     id: "testId",
  //     ...req.body.elderly,
  //   });

  //   // Simula que não existe um id duplicado no banco de dados
  //   Elderly.findOne.mockResolvedValueOnce(null);

  //   await ElderlyController.post_elderly[1](req, res, next);

  //   expect(Elderly.prototype.save).toHaveBeenCalled();
  //   expect(res.status).toHaveBeenCalledWith(200);
  //   expect(res.json).toHaveBeenCalledWith({
  //     id: "testId",
  //     ...req.body.elderly,
  //   });
  //   expect(next).not.toHaveBeenCalled();
  // });
});
