#!/usr/bin/env python3
import json
import numpy as np
import copy
import math
from scipy.interpolate import griddata

def is_point_inside_territory(dataMatrix, targetVector):
    A = np.transpose(np.copy(dataMatrix)).tolist()
    det_A = np.linalg.det(A)
    #sign_det_A = math.copysign(1,det_A)
    round_error_acception = -0.0000001
    sign_det_A = det_A/abs(det_A)
    # print('det_A: ', det_A)
    det_A1 = np.zeros(len(A))
    for i in np.arange(0,len(A),1):
        A1 = copy.deepcopy(A)
        A1[i] = targetVector.tolist()
        # print('A1: ', A1)
        det_A1[i] = sign_det_A * np.linalg.det(A1)
        # print('det_A1: ', det_A1)

    if any(x < round_error_acception for x in det_A1) or any(math.isnan(x) for x in det_A1): # x<0 means boundary is also territory
        return False
    elif np.isclose(abs(det_A),sum(det_A1)):
        return True
    else:
        return False

def nDIntp(inputData, values, targetData):
    inputs = np.transpose(np.copy(inputData))
    dimensions = len(inputs)
    listOfPoints = inputs.tolist()
    dataMatrix = np.vstack((np.copy(inputs), np.ones(len(listOfPoints[0]))))
    results = np.zeros(len(targetData))

    for i in np.arange(0,len(targetData),1):
        targetDataTemp = targetData[i]
        targetVectorTemp = np.insert(targetDataTemp, len(targetDataTemp), 1)

        distances = np.linalg.norm(inputData - targetDataTemp, axis=1)
        # print('distances: ', distances, 'i: ', i)
        sorted_indices = np.argsort(distances).tolist()
        # print('sorted_indices: ', sorted_indices, 'i: ', i)

        for j in np.arange(dimensions,len(sorted_indices),1):
            is_point_inside = False
            test_indices = sorted_indices[:dimensions]
            test_index = sorted_indices[j]
            test_indices.extend([test_index])
            # print('test_indices: ', test_indices, ', ', i, ', ', j)
            squareShapeDataMatrixTemp = np.vstack((np.transpose(inputData[test_indices]), np.ones(dimensions+1)))
            # print('squareShapeDataMatrixTemp: ', squareShapeDataMatrixTemp)
            is_point_inside = is_point_inside_territory(squareShapeDataMatrixTemp, targetVectorTemp)
            # print('is point inside?: ', is_point_inside, 'i: ', i, 'j: ', j)
            if is_point_inside:
                break;

        squareShapeValuesTemp = values[sorted_indices[:dimensions+1]]

        lambdaMatrixTemp = np.linalg.inv(squareShapeDataMatrixTemp) @ targetVectorTemp
        resultTemp = lambdaMatrixTemp @ squareShapeValuesTemp
        if is_point_inside:
            # print('resultTemp: ', resultTemp, 'i: ', i, 'j: ', j)
            results[i] = resultTemp
        else:
            # print('nan', i, ', ', j)
            results[i] = float('nan')


    return results

# listOfPoints = [[0,3]]
# values = np.array([0,7])
# targetData = np.array([[0.2]]) #True

# listOfPoints = [[0,3,0,1], [0,0,4,1]]
# values = np.array([0,3,3,5])
# targetData = np.array([[1.1,0.4]]) #True
# targetData = np.array([[0.4, 1.1], [0.5, 0.5],[4,5],[1.1,0.4]])

# listOfPoints = [[0,3,0], [0,0,4]]
# values = np.array([0,3,3])
# targetData = np.array([[4,5]]) #False

# listOfPoints = [[0,1,0,0.5], [0,0,1,0.5], [0,0,0,1]]
# values = np.array([0,3,7,9])
# targetData = np.array([[0.45,0.5,0.7]]) #True

# listOfPoints = [[0,1,0,0.5], [0,0,1,0.5], [0,0,0,1]]
# values = np.array([0,3,7,9])
# targetData = np.array([[45,5,7]]) #False

# listOfPoints = [[0,1,0,0.5,0], [0,0,1,0.5,0], [0,0,0,1,0], [0,0,0,0,20]]
# values = np.array([0,3,7,9,11])
# targetData = np.array([[0.45,0.5,0.7,0.7]]) #True

# listOfPoints = [[0.5,1,0,0,0], [0,0,1,0,6], [0,0,0,1,0], [0,0,0,7,8]]
# values = np.array([10,20,30,40,50])
# targetData = np.array([[1.45,1.5,1.7,1.5]]) #False

# inputs = np.array(listOfPoints)
# distances = np.linalg.norm(np.transpose(inputs) - targetData[0], axis=1)
# sorted_indices = np.argsort(distances)

# inputData = np.transpose(np.copy(inputs))
# print('inputData: \n', inputData)

# nDIntpResults = nDIntp(inputData, values, targetData)
# print('nDIntpResults: ', nDIntpResults)

# grid_values = griddata(inputData, values, targetData, method='linear')
# print(' grid_values: ', grid_values)
