import sys
import numpy

import aeneas.globalfunctions as gf
from aeneas.dtw import DTWAligner

def compute_best_path(acc_matrix):
  acc_min_cost = 0
  # Get dimensions
  n, m = acc_matrix.shape
  i = n - 1
  j = m - 1
  path = [(i, j)]
  # Compute best minimal-cost path
  while (i > 0) or (j > 0):
    if i == 0:
      path.append((0, j - 1))
      j -= 1
    elif j == 0:
      path.append((i - 1, 0))
      i -= 1
    else:
      costs = [
        acc_matrix[i - 1][j],
        acc_matrix[i][j - 1],
        acc_matrix[i - 1][j - 1]
      ]
      moves = [
        (i - 1, j),
        (i, j - 1),
        (i - 1, j - 1)
      ]
      min_cost_idx = numpy.argmin(costs)
      min_move = moves[min_cost_idx]
      min_cost = costs[min_cost_idx]
      # Keep track of accumulative cost
      acc_min_cost += min_cost
      path.append(min_move)
      i, j = min_move
  return acc_min_cost

if __name__ == "__main__":
  original_fragment_path = sys.argv[1]
  learner_fragment_path = sys.argv[2]
  aligner = DTWAligner(real_wave_path=learner_fragment_path, synt_wave_path=original_fragment_path)
  cost_matrix = aligner.compute_accumulated_cost_matrix()
  acc_min_cost = compute_best_path(cost_matrix)
  print "{0:.2f}".format(acc_min_cost)
