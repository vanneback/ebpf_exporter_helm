Contribution Guidelines
=======================

Thank you for contributing! :smile:

 1. Get the requirements:

    * Docker
    * Helm

 2. Fork and clone repository
    
    ```sh
    git clone git@github.com:<org-or-user>/ebpf-exporter-deploy
    cd ebpf-exporter-deploy
    ```

 3. Create new branch

    ```sh
    git checkout -b <new-branch>
    ```

 4. Build and lint your changes

    Build `docker/` package:

    ```sh
    docker $ docker build .
    ```

    Lint `helm/` package:

    ```sh
    helm $ helm lint .
    ```

 5. Commit your changes

 6. Push, and submit pull request
